const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

module.exports = {
    context: __dirname,
    entry: './blocks/src/blocks.js',
    mode: 'development',
    output: {
        path: __dirname + '/blocks/dist/',
        filename: 'blocks.build.js'
    },
    watch:true,
    module: {
        rules: [
            {
                test: /.js$/,
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
                  MiniCssExtractPlugin.loader,
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
    plugins: [
        new FixStyleOnlyEntriesPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/blocks.[name].build.css',
            chunkFilename: 'css/blocks.[name].build.css',
            ignoreOrder: true, // Enable to remove warnings about conflicting order
        }),
    ],
    optimization: {
        splitChunks: {
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /style\.scss$/,
              
              chunks: 'all',
              enforce: true,
            },
            editor: {
                name: 'editor',
                test: /editor\.scss$/,
                chunks: 'all',
                enforce: true,
            },
          },
        },
      },
    
};