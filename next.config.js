/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const config = {
  pwa: {
    dest: 'public',
    runtimeCaching,
  },

  webpack(config, options) {
    // Fixes npm packages that depend on node modules
    // https://github.com/vercel/next.js/issues/7755
    if (typeof window === 'undefined') {
      config.node = {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
        'fast-crc32c': 'empty',
      }
    }

    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
    })

    config.module.rules.push({
      test: /\.graphqls$/,
      exclude: /node_modules/,
      // graphql-let/schema/loader allows watching schema changes
      use: ['graphql-let/schema/loader', 'graphql-tag/loader'],
    })

    return config
  },
}

module.exports = process.env.NODE_ENV === 'production' ? withPWA(config) : config
