// Global
import Head from 'next/head';

const Layout = (): JSX.Element => {
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

export default Layout;
