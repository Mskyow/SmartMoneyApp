import { CracoConfig } from '@craco/types';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import { Configuration } from 'webpack';

const config: CracoConfig = {
  webpack: {
    configure: (webpackConfig: Configuration) => {
      if (!webpackConfig.plugins) {
        webpackConfig.plugins = [];
      }
      if (!webpackConfig.resolve) {
        webpackConfig.resolve = {};
      }

      webpackConfig.resolve.fallback = {
        buffer: require.resolve('buffer/index.js'),
        stream: require.resolve('stream-browserify'),
        process: require.resolve('process/browser'),
        
      };

      webpackConfig.resolve.alias = {
        buffer: require.resolve('buffer/index.js'), 
        process: require.resolve('process/browser'),
        stream: require.resolve('stream-browserify'),
        
      };

      webpackConfig.resolve.extensions = [
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
        '.mjs', 
        '.json', 
      ];

      webpackConfig.plugins.push(new NodePolyfillPlugin());

      return webpackConfig;
    },
  },
};

export default config;
