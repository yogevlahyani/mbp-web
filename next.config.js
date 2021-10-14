const nextTranslate = require('next-translate');
const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    register: true,
    disable: process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production',
    importScripts: ['/OneSignalSDKUpdaterWorker.js', '/OneSignalSDKWorker.js'],
  },
  ...nextTranslate({
    webpack: (cfg) => {
      cfg.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        options: { mode: ['react-component'] },
      });
      return cfg;
    },
  }),
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/sign-up',
          destination: '/api/auth/login',
        },
        {
          source: '/sign-in',
          destination: '/api/auth/login',
        },
        {
          source: '/sign-out',
          destination: '/api/auth/logout',
        },
        {
          source: '/auth/:slug*',
          destination: '/api/auth/:slug*',
        },
      ],
    };
  },
  images: {
    domains: ['unpkg.com', 'drive.google.com'],
  },
});
