const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
    context: __dirname,
    mode: 'production',
    entry: './blocks/src/blocks.js',
    output: {
      path: __dirname + '/blocks/dist/',
      filename: 'blocks.build.js'
    },
    watch:true,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
            },
            {
                test: /\.scss$/,
                use: [  
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'blocks.[name].build.css',
                            context: './',
                            outputPath: '/',
                            publicPath: '/dist'
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
        ],
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
  },
};