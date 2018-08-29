const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const hashSuffix = isProd ? '.[chunkhash]' : '';

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: `vendor${hashSuffix}.js`,
    minChunks(module) {
      return module.context && module.context.indexOf('node_modules') >= 0;
    },
  }),
  new ExtractTextPlugin(`[name]${hashSuffix}.css`),
  new HtmlPlugin({
    filename: 'index.html',
    template: 'src/index.template.html',
    favicon: 'src/resources/favicon.ico',
  }),
];

if (process.env.NODE_ENV !== 'production') {
  plugins.push(...[new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()]);
} else {
  plugins.push(
    ...[
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
    ],
  );
}

module.exports = {
  entry: ['./src/main.jsx'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `[name]${hashSuffix}.js`,
  },
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react' ],
          plugins: [ '@babel/plugin-proposal-class-properties']
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
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
