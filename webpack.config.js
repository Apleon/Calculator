const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'production',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    open: true,       
    hot: true,        
    port: 8080,       
  },
};