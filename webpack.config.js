const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const autoprefixer = require('autoprefixer');

module.exports = env => {

  let timestamp = new Date().getTime();
  return {
        entry: './src/index.js',
        resolve: {
          extensions: ['*', '.js', '.jsx'],
        },
        output: {
          path: path.join (__dirname, '/dist'),
          filename: `index_bundle.js?${timestamp}`,
          publicPath: '/',
        },
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
              test: /\.css$/,
            include: /node_modules/,
            loader: 'style-loader!css-loader'
            },
            {
              test: /\.css$/,
              exclude: /node_modules/,
              use: [
                { loader: 'style-loader' },
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    modules: true,
                    localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
                  },
                },
                {
                  loader:'postcss-loader',
                  options: {
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                        autoprefixer ({
                          browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9', // React doesn't support IE8 anyway
                          ],
                          flexbox: 'no-2009',
                      }),
                      require('postcss-modules-values'),
                    ],
                  },
                },
                {loader: require.resolve('sass-loader')},
              ],
          },

          {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
              'file-loader'
            ]
          },
          {
              test: /\.(woff|woff2|eot|ttf|otf)$/,
              use: [           
                'file-loader'
              ]
          }
          ]
        },
        
        plugins: [
          new HtmlWebpackPlugin({
            template: "./src/index.html"
          }),
          new CleanWebpackPlugin(['dist']),
          new Dotenv()
        ],
        performance: {
          hints: false,
          maxEntrypointSize: 512000,
          maxAssetSize: 512000
        },
        devServer: {
          historyApiFallback: true
        }
      }
};
