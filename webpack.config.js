const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: /node_modules/,
        test: /\.ts$/,
        use: [
          {
            loader: 'tslint-loader',
            options: {
              typeCheck: true,
            },
          },
        ],
      },
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
};