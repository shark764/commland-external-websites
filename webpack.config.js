const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const path = require('path');

const orgName = 'commland';
const projectName = 'external-websites';

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName,
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    plugins: [],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@modules': path.resolve(__dirname, 'src/modules/'),
        '@languages': path.resolve(__dirname, 'src/languages/'),
        '@configuration': path.resolve(__dirname, 'src/configuration/'),
        '@assets': path.resolve(__dirname, 'src/assets/'),
      },
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
                attributes: { id: 'commland-external-websites' },
              },
            },
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.(jpg|png|mp3)$/,
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash].[ext]',
          },
        },
      ],
    },
    devServer: {
      historyApiFallback: {
        disableDotRule: true,
      },
    },
  });
};
