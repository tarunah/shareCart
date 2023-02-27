const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const withReport = process.env.npm_config_withReport;

const { InjectManifest } = require('workbox-webpack-plugin');

const generateServiceWorker = () => {
  if (process.env.NODE_ENV === 'production' || process.env.ENABLE_SW) {
    return [
      new InjectManifest({
        swSrc: './utils/workboxConfig.js',
        swDest: 'wb.js',
        exclude: [/\.map$/, /\.txt$/, /_redirects/, /manifest$/],
        maximumFileSizeToCacheInBytes: 5000000
      })
    ];
  }
  return [];
};

module.exports = {
  baseConfig: {
    context: path.resolve(__dirname, 'src'),
    entry: {
      legacyPolyfill: [
        'core-js/fn/object/assign',
        'core-js/fn/array/find',
        'core-js/fn/array/find-index',
        'core-js/fn/array/from',
        'core-js/fn/array/fill',
        'core-js/fn/string/includes',
        'core-js/es6/promise',
        'core-js/es6/symbol'
      ],
      mobile: ['./browser/entries/mobile.js'],
      desktop: ['./browser/entries/desktop.js']
    },
    stats: { children: false },
    output: {
      path: path.resolve(__dirname, 'public'),
      publicPath: '/v2checkout/assets/',
      filename: '[name].js',
      chunkFilename: '[name].js'
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'initial',
            name: 'vendor',
            test: /node_modules(?![/\a-z]*\/@myntra\/m-comp|[/\a-z]*\/@myntra\/vision)/,
            enforce: true
          },
          styles: {
            test: /\.(css)$/,
            enforce: true
          }
        }
      }
    },
    resolve: {
      symlinks: false,
      alias: {
        react: 'preact/compat',
        'react-dom': 'preact/compat',
        commonUtils: path.resolve(__dirname, 'src/utils/'),
        commonBrowserUtils: path.resolve(__dirname, 'src/browser/utils'),
        customHooks: path.resolve(__dirname, 'src/browser/hooks'),
        commonResources: path.resolve(
          __dirname,
          'src/browser/components/resources'
        ),
        commonComp: path.resolve(__dirname, 'src/browser/components/common'),
        iconComp: path.resolve(
          __dirname,
          'node_modules/@myntra/m-comp/react/SVGIcon'
        ),
        vision: path.resolve(__dirname, 'node_modules/@myntra/vision/lib'),
        '@context': path.resolve(__dirname, 'src/browser/context'),
        '@config': path.resolve(__dirname, 'src/config')
      },
      extensions: ['.tsx', '.ts', '...']
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          use: { loader: 'ts-loader' },
          exclude: /node_modules(?![/\a-z]*\/@myntra\/m-comp|[/\a-z]*\/@myntra\/vision)/
        },

        // addition - add source-map support
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules(?![/\a-z]*\/@myntra\/m-comp|[/\a-z]*\/@myntra\/vision)/,
          loader: 'source-map-loader'
        }
      ]
    },
    plugins: [
      new LodashModuleReplacementPlugin({
        shorthands: false,
        cloning: false,
        currying: false,
        caching: false,
        collections: false,
        exotics: false,
        guards: false,
        metadata: false,
        deburring: false,
        unicode: false,
        chaining: false,
        memoizing: true,
        coercions: false,
        flattening: false,
        paths: true,
        placeholders: false
      }),
      new webpack.ProgressPlugin(),
      new AssetsPlugin(),
      ...generateServiceWorker()
    ].concat(
      withReport
        ? [
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              openAnalyzer: false
            })
          ]
        : []
    )
  }
};
