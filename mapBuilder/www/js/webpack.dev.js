const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    mapbuilder: './main.js',
    mapbuilderadmin: './mainadmin.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false)
    })
  ]
};
