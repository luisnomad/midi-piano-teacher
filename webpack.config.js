module.exports = {
  // Other configurations...
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules\/midimessage/,
        ],
      },
    ],
  },
};