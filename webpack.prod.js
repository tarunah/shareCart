let webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const COLORS = require('./src/browser/components/resources/colors');
const {
  FONT_SIZE,
  FONT_WEIGHT
} = require('./src/browser/components/resources/variables');

const SentryWebpackPlugin = require('@sentry/webpack-plugin');

const RELEASE_HASH = (function() {
  try {
    const execSync = require('child_process').execSync;
    let stdout = execSync('git rev-parse HEAD');
    let output = stdout.toString('utf8').replace('\n', '');
    return output;
  } catch (error) {
    return '';
  }
})();

function getPluginConfig() {
  const SENTRY_PUSH = false;
  if (SENTRY_PUSH) {
    return [
      new SentryWebpackPlugin({
        authToken:
          'f1222554f5644b57b4505a75ff7bc4808cef6507dd074c43ac0c25ffb5cc2cdd',
        org: 'myntra-designs-pvt-ltd',
        project: 'checkout',
        release: RELEASE_HASH,
        include: ['src', 'public'],
        urlPrefix: '~/checkout/assets/js/',
        ignore: ['node_modules', 'webpack.config.js']
      })
    ];
  } else return [];
}

module.exports = {
  mode: 'production',
  output: {
    publicPath: 'https://constant.myntassets.com/checkout/assets/',
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js'
  },
  devtool: 'source-map',
  optimization: {},
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]-[local]',
              minimize: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('postcss-constants')({
                  defaults: {
                    colors: COLORS,
                    fontSize: FONT_SIZE,
                    fontWeight: FONT_WEIGHT
                  }
                })
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css',
      chunkFilename: 'css/[name].[chunkhash].css',
      ignoreOrder: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.RELEASE': JSON.stringify(RELEASE_HASH),
      'process.env.CONFIG_PATH': JSON.stringify(''),
      'process.env.ENABLE_SW': true
    }),
    ...getPluginConfig()
  ]
};
