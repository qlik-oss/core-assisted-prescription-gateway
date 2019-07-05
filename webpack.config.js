const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const GoogleAnalytics = 'GTM-P7VJSX';

const isProd = process.env.NODE_ENV === 'production';
const hashSuffix = isProd ? '.[chunkhash]' : '';

const plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.template.html',
    favicon: 'src/resources/favicon.ico',
    title: 'Assisted Prescription',
    GA: GoogleAnalytics,
  }),
  new Dotenv({
    path: process.env.NODE_ENV === 'production' ? '.env' : '.env.local',
    systemvars: true,
  }),
];

if (process.env.NODE_ENV !== 'production') {
  plugins.push(...[new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()]);
}

module.exports = {
  entry: ['./src/main.jsx'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `[name]${hashSuffix}.js`,
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          mimetype: 'application/font-woff',
        },
      },
      {
        test: /\.(ttf|eot|jpg|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins,
};
