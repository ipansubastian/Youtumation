const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyPlugin = require('copy')

const autoprefixer = require('autoprefixer');

const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base = {
  entry: {
    content: path.resolve(__dirname, 'src/content/content.js'),
    option: path.resolve(__dirname, 'src/option/option.js'),
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
            },
          },
        ],
      },
    ],
  },
  resolve: {
    // alias: {
    //   styles: []
    // },
    modules: ['node_modules'],
    extensions: ['*', '.js', '.vue', '.json', '.css', '.png'],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/popup/template.html',
      chunks: ['popup'],
      filename: 'popup/popup.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/option/template.html',
      chunks: ['option'],
      filename: 'option/option.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name]/[name].css',
    }),
    // new CopyPlugin([
    //   // { from: './src/manifest.json', to: './manifest.json' },
    //   { from: './src/icons', to: 'icons' },
    // ]),
  ],
};

module.exports = base;
