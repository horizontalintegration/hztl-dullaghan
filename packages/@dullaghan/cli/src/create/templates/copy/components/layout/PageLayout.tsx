// Global
import { SitecoreContext, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Head from 'next/head';
// Lib
import { ExtendedSitecoreContext } from 'lib/sitecore/sitecore-context';

const PageLayout = (): JSX.Element => {
  const route = useSitecoreContext<ExtendedSitecoreContext>().sitecoreContext.route;

  return (
    <>
      <Head>
        <title>project-name</title>
        <meta name="description" content="Page description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>{/* Site header content */}</header>
      <main>{/* Page content */}</main>
      <footer>{/* Site footer content */}</footer>
    </>
  );
};

export default PageLayout;
