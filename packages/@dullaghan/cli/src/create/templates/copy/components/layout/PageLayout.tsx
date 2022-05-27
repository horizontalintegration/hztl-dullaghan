// Global
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Head from 'next/head';

const PageLayout = () => {
  const context = useSitecoreContext();

  // Fail out if we don't have route context
  if (!context.sitecoreContext.route) {
    return <></>;
  }

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
