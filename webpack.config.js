const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
   context: __dirname,
   entry: './blocks/src/blocks.js',
   mode: 'production',
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
                {
                    loader: 'file-loader',
                    options: {
                        name: 'blocks.[name].build.css',
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
   plugins: [
      new MiniCssExtractPlugin('blocks.[name].build.css'),
      new OptimizeCSSAssetsPlugin({
         assetNameRegExp: /\.optimize\.css$/g,
         cssProcessor: require('cssnano'),
         cssProcessorPluginOptions: {
           preset: ['default', { discardComments: { removeAll: true } }],
         },
         canPrint: true
       })
   ],
};