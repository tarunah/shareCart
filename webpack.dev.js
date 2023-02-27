let webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const COLORS = require('./src/browser/components/resources/colors');
const {
  FONT_SIZE,
  FONT_WEIGHT
} = require('./src/browser/components/resources/variables');

module.exports = {
  mode: 'development',
  entry: {
    mobile: ['webpack-hot-middleware/client'],
    desktop: ['webpack-hot-middleware/client']
  },
  devtool: 'source-map',
  optimization: {
    moduleIds: 'named'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.RELEASE': JSON.stringify(''),
      'process.env.CONFIG_PATH': JSON.stringify(''),
      'process.env.ENABLE_SW': JSON.stringify(process.env.ENABLE_SW)
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
      ignoreOrder: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
