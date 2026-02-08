const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const {
  getFilename,
  setDotenvConfig,
  stats,
  getGitInfo,
} = require('./webpack/index.js')

const tsxTsRegExp = /\.tsx?$/

module.exports = (webpackEnv, { mode }) => {
  const isModeProduction = mode === 'production'
  const isServing = 'WEBPACK_SERVE' in webpackEnv && webpackEnv.WEBPACK_SERVE === true

  setDotenvConfig(mode)
  const { BACK_APP_PORT, AUTHORIZATION_TOKEN_REAL_READONLY } = process.env
  const git = getGitInfo()

  const basic = {
    mode,
    devtool: isModeProduction ? false : 'eval-cheap-module-source-map',
    watchOptions: {
      ignored: /node_modules/,
    },
  }

  const devServer = {
    open: true,
    compress: true,
    hot: true, // required for @pmmmwh/react-refresh-webpack-plugin
    // port: 8899,
    historyApiFallback: {
      verbose: false,
    },
    client: {
      reconnect: false, // disable reconnect to earlier opened tabs
      progress: false, // same info that webpack.ProgressPlugin prints to IDE console. There is no need to duplicate it to browser console
      overlay: { errors: true, warnings: false },
    },
  }

  const buildConfig = {
    entry: {
      app: path.resolve(__dirname, './src/index.tsx'), // 'app' is more obvious name then 'main' while 'vendors' generates automatically
    },
    output: {
      path: path.resolve(__dirname, './build'),
      clean: true,
      assetModuleFilename: 'static/media/[contenthash][ext]',
      filename: getFilename(isServing, 'js'),
    },
    optimization: {
      minimize: !isServing,
      minimizer: [
        new CssMinimizerPlugin(),
        '...',
      ],
      splitChunks: {
        chunks: 'all',
      },
    },
  }

  const resolve = {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({
      extensions: ['.tsx', '.ts'],
    })],
    alias: {
      // Reuired for 'yarn link' https://github.com/facebook/react/issues/14257#issuecomment-508808246
      react: require.resolve('react'),
    },
  }

  const module = {
    rules: [
      {
        test: /\.js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: tsxTsRegExp,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: [
            '@babel/transform-runtime',
            isServing && 'react-refresh/babel',
          ].filter(Boolean),
        },
      },
      {
        test: /\.css$/,
        use: [
          isServing ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      // Maybe it will be required in the future
      // {
      //   test: /\.(svg|gif|png|jpg|jpeg)$/,
      //   type: 'asset/resource',
      // },
    ],
  }

  const plugins = [
    isServing && new webpack.ProgressPlugin(),
    isServing && new ReactRefreshWebpackPlugin({
      include: tsxTsRegExp,
      overlay: false, // this overlay is worse, use native devServer overlay
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public/index.html'),
    }),
    // Для GitHub Pages: при любом неизвестном пути отдаётся 404.html — загружается SPA, роутер обрабатывает URL
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public/index.html'),
      filename: '404.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        mode: 'write-references',
        diagnosticOptions: {
          syntactic: true,
          semantic: true,
        },
      },
    }),
    new ESLintPlugin({
      extensions: ['tsx', 'ts', 'js'],
      exclude: ['node_modules', 'build'],
    }),
    new StyleLintPlugin({
      configFile: path.resolve(__dirname, './stylelint.config.js'),
      context: path.resolve(__dirname, './src'),
      files: '**/*.css',
    }),
    new webpack.DefinePlugin({
      'process.env.APP_VERSION': JSON.stringify(git.APP_VERSION),
      'process.env.BACK_APP_PORT': JSON.stringify(BACK_APP_PORT),
      'process.env.AUTHORIZATION_TOKEN_REAL_READONLY': JSON.stringify(AUTHORIZATION_TOKEN_REAL_READONLY),
    }),
    !isServing && new MiniCssExtractPlugin({
      filename: getFilename(isServing, 'css'),
    }),
  ].filter(Boolean)

  return {
    ...basic,
    devServer,
    ...buildConfig,
    resolve,
    module,
    plugins,
    stats,
  }
}
