const webpack = require('webpack');

const entry = './src/app/main.js';
const output = {
  path: __dirname,
  filename: 'main.js',
};

const uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  compressor: {
    screw_ie8: true,
    warnings: false,
  },
  output: {
    comments: false,
  },
});
module.exports.development = {
  debug: true,
  devtool: 'eval',
  entry,
  output,
  module: {

    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.hbs$/, loader: 'handlebars-loader' },

    ],
  },
};

module.exports.production = {
  debug: false,
  entry,
  output,
  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.hbs$/, loader: 'handlebars-loader' },
    ],
  },
  plugins: [
    uglifyJsPlugin,
  ],
};

