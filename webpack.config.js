const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const entries = {};

Object.keys(slsw.lib.entries).forEach(
  (key) => (entries[key] = ['./load-source-maps.ts', slsw.lib.entries[key]]),
);

module.exports = {
  entry: entries,
  target: 'node',
  // Generate sourcemaps for proper error messages
  devtool: 'source-map',
  // Since 'aws-sdk' is not compatible with webpack,
  // we exclude all node dependencies
  externals: [nodeExternals(), 'dd-trace', 'datadog-lambda-js'],
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  optimization: {
    // We no not want to minimize our code.
    minimize: false,
  },
  performance: {
    // Turn off size warnings for entry points
    hints: 'warning',
  },
  resolve: {
    extensions: ['.ts'],
  },
  // Run babel on all .js files and skip those in node_modules
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        loader: 'ts-loader',
        include: path.resolve(__dirname, './src'),
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack'),
          ],
        ],
        options: {
          transpileOnly: true,
        },
        resolve: {
          alias: {
            '@lib': path.resolve(__dirname, './src/lib/'),
          },
        },
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
};
