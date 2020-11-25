module.exports = {
  webpack(config, options) {
    // Fixes npm packages that depend on node modules
    // https://github.com/vercel/next.js/issues/7755
    if (typeof window === 'undefined') {
      config.node = {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
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
      use: ['graphql-let/schema/loader', 'graphql-tag/loader'],
    })

    return config
  },
}
