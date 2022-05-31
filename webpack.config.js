const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const path = require('path');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'commland',
    projectName: 'external-websites',
    webpackConfigEnv,
    argv
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              // Creates `style` nodes from JS strings
              loader: 'style-loader',
              options: {
                injectType: 'singletonStyleTag',
                attributes: { id: 'commio-cluster-manager' }
              }
            },
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader'
          ]
        },
        {
          test: /\.(jpg|png)$/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash].[ext]'
          }
        }
      ]
    },
    devServer: {
      historyApiFallback: {
        disableDotRule: true
      }
    }
  });
};
