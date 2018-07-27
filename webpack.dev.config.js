const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '../css/[name].bundle.css',
  allChunks: true
});

/**
 * @description We need to exclude some files to prevent them from cleaning. All others will be deleted
 */
const cleanDist = new CleanWebpackPlugin(['web'], {
  exclude: [
    '.htaccess',
    'htaccess',
    'index.php',
    'robots.txt',
    'web.config',
    'webappmanifest.json'
  ]
});

/**
 * @description poxying port :8888 to :3000 and start a webserver at localhost:3000.
 * Make sure MAMP is running and is pointing in the project folde '/web'!
 */
const browserSync = new BrowserSyncPlugin({
  host: 'localhost',
  port: 3000,
  proxy: 'http://localhost:8888/',
  files: ['web/css/main.bundle.css', 'web/css/bundle.js'], // much faster when only watching our bundle
  logFileChanges: false
});

module.exports = {
  entry: {
    main: ['./src/js/main.js', './src/scss/styles.scss'] // we need both entries here, js and scss, if you don't import the styles in js
  },
  output: {
    path: path.join(__dirname, '/web/js'),
    filename: '[name].bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: false,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: loader => [
                  require('autoprefixer')({
                    browsers: ['last 2 versions', 'iOS >= 8'],
                    grid: true
                  })
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            }
          ]
        })
      },
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['eslint-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015',
            'stage-0',
            [
              'env',
              {
                targets: {
                  browsers: ['last 2 versions', 'IE >= 10']
                },
                useBuiltIns: true
              }
            ]
          ],
          compact: false
        }
      }
    ]
  },
  plugins: [extractSass, cleanDist, new StyleLintPlugin(), browserSync]
};
