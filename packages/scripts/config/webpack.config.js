const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const resolve = require('resolve');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const paths = require('./paths')
const getClientEnvironment = require('./env')
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { pickBy } = require('lodash')

const createEnvironmentHash = require('./webpack/persistentCache/createEnvironmentHash')

const {
  isEnvDevelopment,
  isEnvTest,
  isEnvProduction,
  getConfig,
  packageJson,
  commonInclude,
} = require('../util')

const appConfig = getConfig()

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '10000',
)


const hasJsxRuntime = (() => {
  if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') {
    return false
  }

  try {
    require.resolve('react/jsx-runtime')
    return true
  } catch (e) {
    return false
  }
})()

module.exports = function (webpackEnv) {
  const isEnvProductionProfile =
    isEnvProduction && process.argv.includes('--profile')

  const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1))

  function getCss(options = { modules: false }) {
    return [
      !isEnvDevelopment && MiniCssExtractPlugin.loader,
      isEnvDevelopment && require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          modules: options.modules,
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          postcssOptions: {
            ident: 'postcss',
            plugins: [
              require('tailwindcss'),
              require('postcss-preset-env')({
                stage: 3,
              }),
            ],
          },
        },
      },
    ]
  }

  let config = {
    target: ['browserslist'],
    stats: 'errors-warnings',
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    // Stop building when throw error
    bail: isEnvProduction,
    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? 'source-map'
        : false
      : isEnvDevelopment && 'cheap-module-source-map',
    entry: paths.appIndexJs,
    output: {
      path: paths.appBuild,
      // Add /* filename */ comments to generated require()s in the output.
      pathinfo: false,
      filename: isEnvDevelopment
        ? `js/bundle.js`
        : `js/[name]/[contenthash:8].js`,
      chunkFilename: isEnvDevelopment
        ? 'js/[name].chunk.js'
        : 'js/[name]/[contenthash:8].chunk.js',
      assetModuleFilename: 'media/[name].[contenthash][ext]',
      publicPath: paths.publicUrlOrPath,
      // Point sourcemap entries to original disk location (format as URL on Windows)
      devtoolModuleFilenameTemplate: isEnvProduction
        ? (info) =>
          path
            .relative(paths.appSrc, info.absoluteResourcePath)
            .replace(/\\/g, '/')
        : isEnvDevelopment &&
        ((info) =>
          path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
    },
    cache: {
      type: 'filesystem',
      version: createEnvironmentHash(env.raw),
      cacheDirectory: paths.appWebpackCache,
      store: 'pack',
      buildDependencies: {
        defaultWebpack: ['webpack/lib/'],
        config: [__filename],
        tsconfig: [paths.appTsConfig, paths.appJsConfig].filter((f) =>
          fs.existsSync(f),
        ),
      },
    },
    infrastructureLogging: {
      level: 'none',
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              // We want terser to parse ecma 8 code. However, we don't want it
              // to apply any minification steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code:
              // https://github.com/facebook/create-react-app/issues/5250
              // Pending further investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            // Added for profiling in devtools
            keep_classnames: isEnvProductionProfile,
            keep_fnames: isEnvProductionProfile,
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              ascii_only: true,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        //   automaticNameDelimiter: '.',
        //   minSize: 50000,
        //   maxAsyncRequests: 4,
        //   maxInitialRequests: 3,
        //   usedExports: true,
        //   cacheGroups: {
        //     common_base: {
        //       test: /\/node_modules\/(react|react-dom|prop-types|lodash|moment|mobx|mobx-react|mobx-react-lite)\//,
        //       priority: 10,
        //       reuseExistingChunk: true,
        //     },
        //     common_chunk: {
        //       test: paths.appSrc,
        //       minChunks: 3,
        //       priority: 10,
        //       reuseExistingChunk: true,
        //     },
        //   },
      },
      // runtimeChunk: true,
    },
    resolve: {
      modules: ['node_modules', paths.appNodeModules],
      extensions: ['.js', '.tsx', '.ts'],
      alias: {
        ...pickBy(
          {
            // yarn link 后保持 react/core-js/core-js-pure 一致
            react:
              isEnvDevelopment &&
              path.resolve(paths.appPath + '/node_modules/react'),
            'react-router':
              isEnvDevelopment &&
              path.resolve(paths.appPath + '/node_modules/react-router'),
            'react-router-dom':
              isEnvDevelopment &&
              path.resolve(paths.appPath + '/node_modules/react-router-dom'),
            'core-js':
              isEnvDevelopment &&
              path.resolve(paths.appPath + '/node_modules/core-js'),
            'core-js-pure':
              isEnvDevelopment &&
              path.resolve(paths.appPath + '/node_modules/core-js-pure'),
            'bn.js':
              isEnvDevelopment &&
              path.resolve(paths.appPath + '/node_modules/bn.js'),
            '@gm-common':
              isEnvDevelopment &&
              path.resolve(paths.appPath + '/node_modules/@gm-common'),
            '@gm-pc':
              isEnvDevelopment &&
              path.resolve(paths.appPath + '/node_modules/@gm-pc'),
            common: paths.appPath + '/src/js/common/',
            stores: paths.appPath + '/src/js/stores/',
            svg: paths.appPath + '/src/svg/',
            img: paths.appPath + '/src/img/',
            '@': paths.appPath + '/src/',
          },
          Boolean,
        ),
      },
      plugins: [
        new TsconfigPathsPlugin({
          configFile: paths.appPath + '/tsconfig.json',
        })
      ],
      fallback: {
        'react/jsx-runtime': 'react/jsx-runtime.js',
        'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
      },
    },
    module: {
      // Repalce error with warning when export is not found
      // strictExportPresence: true,
      rules: [
        // Handle node_modules packages that contain sourcemaps
        shouldUseSourceMap && {
          enforce: 'pre',
          exclude: /@babel(?:\/|\\{1,2})runtime/,
          // include: commonInclude,
          test: /\.(js|mjs|jsx|ts|tsx|css)$/,
          loader: require.resolve('source-map-loader'),
        },
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              type: 'asset',
              parser: {
                dataUrlCondition: {
                  maxSize: imageInlineSizeLimit,
                },
              },
            },
            {
              test: /\.svg$/,
              use: [
                {
                  loader: '@svgr/webpack',
                  options: {
                    icon: true,
                    expandProps: 'start',
                    svgProps: {
                      fill: 'currentColor',
                      // className 冗余
                      className:
                        "{'gm-svg-icon t-svg-icon m-svg-icon ' + (props.className || '')}",
                    },
                  },
                },
              ],
            },
            // The preset includes JSX, Flow, TypeScript, and some ESnext features.
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              include: commonInclude,
              // exclude: /@babel\/runtime/,
              use: [
                // { loader: require.resolve('thread-loader') }, // @sentry/webpack-plugin不支持
                {
                  loader: require.resolve('babel-loader'),
                  options: {
                    customize: require.resolve(
                      'babel-preset-react-app/webpack-overrides',
                    ),
                    presets: [
                      [
                        require.resolve('babel-preset-react-app'),
                        {
                          runtime: hasJsxRuntime ? 'automatic' : 'classic',
                        },
                      ],
                    ],
                    plugins: [
                      isEnvDevelopment &&
                      require.resolve('react-refresh/babel'),
                    ].filter(Boolean),
                    cacheDirectory: true,
                    // See #6846 for context on why cacheCompression is disabled
                    cacheCompression: false,
                    compact: isEnvProduction,
                  },
                },
              ],
            },
            // Unlike the application JS, we only compile the standard ES features.
            {
              test: /\.(js|mjs)$/,
              include: commonInclude,
              // exclude: /@babel(?:\/|\\{1,2})runtime/,
              use: [
                // { loader: require.resolve('thread-loader') }, // @sentry/webpack-plugin不支持
                {
                  loader: require.resolve('babel-loader'),
                  options: {
                    babelrc: false,
                    configFile: false,
                    compact: false,
                    presets: [
                      [
                        require.resolve('babel-preset-react-app/dependencies'),
                        { helpers: true },
                      ],
                    ],
                    cacheDirectory: true,
                    // See #6846 for context on why cacheCompression is disabled
                    cacheCompression: false,

                    // Babel sourcemaps are needed for debugging into node_modules
                    // code.  Without the options below, debuggers like VSCode
                    // show incorrect code and set breakpoints on the wrong lines.
                    sourceMaps: shouldUseSourceMap,
                    inputSourceMap: shouldUseSourceMap,
                  },
                },
              ],
            },
            // {
            //   test: /\.(js|ts|tsx)$/,
            //   use: [
            //     {
            //       loader: require.resolve('swc-loader'),
            //     },
            //   ],
            //   include: commonInclude,
            // },
            {
              test: /\.module\.css$/,
              use: [...getCss({ modules: true })].filter(Boolean),
            },
            {
              test: /\.css$/,
              exclude: /\.module\.css$/,
              use: [...getCss()].filter(Boolean),
              sideEffects: true,
            },
            {
              test: /\.module\.less$/,
              use: [
                ...getCss({ modules: true }),
                require.resolve('less-loader'),
              ].filter(Boolean),
              sideEffects: true,
            },
            {
              test: /\.less$/,
              exclude: /\.module\.less$/,
              use: [...getCss(), require.resolve('less-loader')].filter(
                Boolean,
              ),
            },
            {
              exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              type: 'asset/resource',
            },
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the "file" loader.
          ],
        },
        {
          resourceQuery: /raw/,
          type: 'asset/source',
        }
      ].filter(Boolean),
    },
    plugins: [
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml,
            branch: process.env.GIT_BRANCH || 'none',
            commit: process.env.GIT_COMMIT || 'none',
            env: process.env.NODE_ENV || 'none',
          },
          isEnvProduction
            ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
            : undefined,
        ),
      ),
      // Inlines the webpack runtime script. This script is too small to warrant
      // a network request. https://github.com/facebook/create-react-app/issues/5358
      isEnvProduction &&
      new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
      // This gives some necessary context to module not found errors, such as
      // the requesting resource.
      new ModuleNotFoundPlugin(paths.appPath),
      new webpack.DefinePlugin({
        ...env.stringified,
        __DEBUG__: isEnvDevelopment,
        __DEVELOPMENT__: isEnvDevelopment,
        __TEST__: isEnvTest,
        __PRODUCTION__: isEnvProduction,
        __VERSION__: JSON.stringify(packageJson.version),
        __NAME__: JSON.stringify(packageJson.aliasName || 'none'),
        __CLIENT_NAME__: JSON.stringify(packageJson.clientName || 'none'),
        __BRANCH__: JSON.stringify(process.env.GIT_BRANCH || 'none'),
        __COMMIT__: JSON.stringify(process.env.GIT_COMMIT || 'none'),
        __AUTO_ROUTER_REG__: appConfig.autoRouterReg || '/index\\.page\\./',
      }),
      isEnvDevelopment &&
      new ReactRefreshWebpackPlugin({
        overlay: false,
      }),
      isEnvDevelopment && new CaseSensitivePathsPlugin(),
      isEnvProduction &&
      new MiniCssExtractPlugin({
        filename: 'css/[name]/[contenthash:8].css',
        chunkFilename: 'css/[name]/[contenthash:8].chunk.css',
      }),
      // Generate an asset manifest file with the following content:
      // - "files" key: Mapping of all asset filenames to their corresponding
      //   output file so that tools can pick it up without having to parse
      //   `index.html`
      // - "entrypoints" key: Array of files which are included in `index.html`,
      //   can be used to reconstruct the HTML if necessary
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: paths.publicUrlOrPath,
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path
            return manifest
          }, seed)
          const entrypointFiles = entrypoints.main.filter(
            (fileName) => !fileName.endsWith('.map'),
          )

          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          }
        },
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
      new ProgressBarPlugin(),
    ].filter(Boolean),
    // Turn off performance processing because we utilize
    // our own hints via the FileSizeReporter
    performance: false,
    devServer: {
      historyApiFallback: true,
      host: appConfig.host || '0.0.0.0',
      port: appConfig.port || 8080,
      proxy: appConfig.proxy || {},
      https: appConfig.https || false,
    },
    externals: {
      'gm-i18n': 'gmI18n',
      echarts: 'echarts',
    },
    ignoreWarnings: [
      /Failed to parse source map/,
      // trusted libs
      /not exported from \'(gm_api|@antv)/,
      /was not found in '(gm_api|@antv)/,
    ],
  }

  if (fs.existsSync(paths.appConfig + '/webpack.config.js')) {
    config = require(paths.appConfig + '/webpack.config.js')(config)
  }

  return config
}
