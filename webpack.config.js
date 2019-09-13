module.exports = {
   context: __dirname,
   entry: {
     blocks: './blocks/src/blocks.js',
     filters: './blocks/src/filters/block-filters.js',
   },
   mode: 'production',
   output: {
      path: __dirname + '/blocks/dist/',
      filename: '[name].build.js'
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
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
      ],
   },
};
