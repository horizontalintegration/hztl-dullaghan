/** @type {import('next').NextConfig} */
// GLobal
const { getPublicUrl } = require('@sitecore-jss/sitecore-jss-nextjs');
const fs = require('fs');
// Local
const jssConfig = require('./temp/config');
const packageConfig = require('./package.json').config;

// A public URL (and uses below) is required for Sitecore Experience Editor support.
// This is set to http://localhost:3000 by default. See .env for more details.
let publicUrl = getPublicUrl();

// If we're using localtunnel, use that url instead.
if (fs.existsSync('./.tunnel')) {
  publicUrl = fs.readFileSync('./.tunnel', 'utf8');
}

const nextConfig = {
  // Set assetPrefix to our public URL
  assetPrefix: publicUrl,

  // Allow specifying a distinct distDir when concurrently running app in a container
  distDir: process.env.NEXTJS_DIST_DIR || '.next',

  // Make the same PUBLIC_URL available as an environment variable on the client bundle
  env: {
    PUBLIC_URL: publicUrl,
  },

  i18n: {
    // These are all the locales you want to support in your application.
    // These should generally match (or at least be a subset of) those in Sitecore.
    locales: ['en'],
    // This is the locale that will be used when visiting a non-locale
    // prefixed path e.g. `/styleguide`.
    defaultLocale: packageConfig.language,
  },

  // Enable React Strict Mode
  reactStrictMode: true,

  async rewrites() {
    // When in connected mode we want to proxy Sitecore paths off to Sitecore
    return [
      {
        source: '/sitecore/api/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/api/:path*`,
      },
      // media items
      {
        source: '/-/:path*',
        destination: `${jssConfig.sitecoreApiHost}/-/:path*`,
      },
      // visitor identification
      {
        source: '/layouts/:path*',
        destination: `${jssConfig.sitecoreApiHost}/layouts/:path*`,
      },
    ];
  },
};
