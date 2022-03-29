// Global
import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { ComponentPropsContext, SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
// Lib
import type { SitecorePageProps } from 'lib/sitecore/page-props';
import type { ExtendedSitecoreContext } from 'lib/sitecore/sitecore-context';
import { sitemapFetcher } from 'lib/sitecore/sitemap-fetcher';
import { sitecorePagePropsFactory } from 'lib/sitecore/page-props-factory';
// Config
import { componentFactory } from 'temp/component-factory';
// Components
import PageLayout from 'components/layout/PageLayout';
import NotFound from 'components/layout/NotFound';

export const getStaticPaths: GetStaticPaths = async (context) => {
  if (process.env.NODE_ENV !== 'development') {
    const paths = await sitemapFetcher.fetch(context);

    return {
      paths,
      fallback: process.env.EXPORT_MODE ? false : 'blocking',
    };
  }

  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const props = await sitecorePagePropsFactory.create(context);

  // Revalidate the ISR cache via the supplied environment variable
  // or once every 300 seconds (5 minutes)
  const revalidate = !!process.env.ISR_REVALIDATE_TIMER
    ? parseInt(process.env.ISR_REVALIDATE_TIMER, 10)
    : 300;

  return {
    props,
    revalidate,
    notFound: props.notFound,
  };
};

const SitecorePage: NextPage<SitecorePageProps> = ({ componentProps, layoutData, notFound }) => {
  // NotFound should be caught/served as part of getStaticPaths but this is
  // here as a backup just in case.
  if (notFound || !layoutData?.sitecore?.route) {
    return <NotFound />;
  }

  const context: ExtendedSitecoreContext = {
    route: layoutData.sitecore.route,
    itemId: layoutData.sitecore.route?.itemId,
    ...layoutData.sitecore.context,
  };

  return (
    <ComponentPropsContext value={componentProps}>
      <SitecoreContext context={context} componentFactory={componentFactory}>
        <PageLayout />
      </SitecoreContext>
    </ComponentPropsContext>
  );
};

export default SitecorePage;
