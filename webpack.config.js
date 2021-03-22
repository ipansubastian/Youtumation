const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
// const CopyPlugin = require('copy')

const autoprefixer = require('autoprefixer');

const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyLoader = require('copy-loader');
const copyWebpackPlugin = require('copy-webpack-plugin');

const base = {
  entry: {
    content: path.resolve(__dirname, 'src/content/content.js'),
    options: path.resolve(__dirname, 'src/options/options.js'),
    background: path.resolve(__dirname, 'src/background/background.js'),
    popup: path.resolve(__dirname, 'src/popup/popup.js'),
    // tailwind: path.resolve(__dirname, 'src/blobal/main.css')
    // _: path.resolve(__dirname, 'src/_.js')
  },
  output: {
    filename: '[name]/[name].app.js',
    path: path.resolve(__dirname, 'build'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: '/assets/[name].[ext]',
              outputDirectory: 'build/assets',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    fallback: {
      fs: false,
    },
    // alias: {
    //   styles: []
    // },
    modules: ['node_modules'],
    extensions: ['*', '.js', '.vue', '.json', '.css', '.png'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/popup/template.html',
      chunks: ['popup'],
      filename: 'popup/popup.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/options/template.html',
      chunks: ['options'],
      filename: 'options/options.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name]/[name].css',
    }),
    // new copyWebpackPlugin({ patterns: [{ from: './src/assets', to: './icons' }] }),

    // new CopyPlugin([
    //   // { from: './src/manifest.json', to: './manifest.json' },
    //   { from: './src/icons', to: 'icons' },
    // ]),
  ],
};

module.exports = base;
