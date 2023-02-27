//dev setup
let webPackConfig = require('../../../webpack.config');
let compiler = require('webpack')(webPackConfig);

module.exports = function(app) {
  if (process.env.NODE_ENV == 'development') {
    app.use(
      require('webpack-dev-middleware')(compiler, {
        publicPath: webPackConfig.output.publicPath,
        stats: {
          colors: true,
          chunks: false
        }
      })
    );
    app.use(require('webpack-hot-middleware')(compiler));
  }
};
