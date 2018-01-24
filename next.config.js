const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  webpack: (config, { dev }) => {
    config.module.rules.push(
      {
        test: /\.(less)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!less-loader'
        })
        // use this for development - see here https://github.com/aoc/with-ant-design-custom-theme
        //use: ['babel-loader', 'raw-loader', 'less-loader']
      }
    );

    config.plugins.push(
      new ExtractTextPlugin(__dirname + '/static/styles.css')
    );

    return config;
  }
};
