const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CssEntryPlugin = require('css-entry-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '../css/[name].bundle.css',
  allChunks: true,
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
    'webappmanifest.json',
  ],
});

module.exports = {
  entry: {
    main: ['./src/js/main.js', './src/scss/styles.scss'],
  },
  output: {
    path: path.join(__dirname, '/web/js'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.scss$/,
        exclude: /node_modules/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
              options: { minimize: true },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false,
                plugins: loader => [
                  require('autoprefixer')({
                    browsers: ['last 2 versions', 'iOS >= 8'],
                    grid: true,
                  }),
                  require('cssnano')(),
                ],
              },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
          ],
        }),
      },
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['eslint-loader'],
      }, {
        test: /\.js$/,
        exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', ['env',
            {
              'targets': {
                'browsers': [
                  'last 2 versions',
                  'IE >= 10'
                ]
              },
              'useBuiltIns': true
            }]
          ],
          compact: true
        }
      },
    ],
  },
  plugins: [
    extractSass,
    cleanDist,
    new StyleLintPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        output: {
          comments: false,
          beautify: false,
        },
        ie8: true,
        keep_classnames: undefined,
        keep_fnames: false,
        safari10: true,
      },
    }),
  ],
};
