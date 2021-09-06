const nextTranslate = require('next-translate');

module.exports = {
  reactStrictMode: true,
  webpack: (cfg) => {
    cfg.module.rules.push({
      test: /\.md$/,
      loader: 'frontmatter-markdown-loader',
      options: { mode: ['react-component'] },
    });
    return cfg;
  },
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
    domains: ['unpkg.com'],
  },
  ...nextTranslate(),
};
