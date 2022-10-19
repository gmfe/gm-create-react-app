const fs = require('fs')
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware')
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware')
const ignoredFiles = require('react-dev-utils/ignoredFiles')
const redirectServedPath = require('react-dev-utils/redirectServedPathMiddleware')
const paths = require('./paths')
const getHttpsConfig = require('./getHttpsConfig')

const host = process.env.HOST || '0.0.0.0'
const sockHost = process.env.WDS_SOCKET_HOST
const sockPath = process.env.WDS_SOCKET_PATH // default: '/ws'
const sockPort = process.env.WDS_SOCKET_PORT

module.exports = function (proxy, allowedHost) {
  const disableFirewall =
    !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true'
  return {
    allowedHosts: disableFirewall ? 'all' : [allowedHost],
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    },
    compress: true,
    static: {
      directory: paths.appPublic,
      publicPath: [paths.publicUrlOrPath],
      // By default files from `contentBase` will not trigger a page reload.
      watch: {
        // Reportedly, this avoids CPU overload on some systems.
        // https://github.com/facebook/create-react-app/issues/293
        // src/node_modules is not ignored to support absolute imports
        // https://github.com/facebook/create-react-app/issues/1065
        ignored: ignoredFiles(paths.appSrc),
      },
    },
    client: {
      webSocketURL: {
        hostname: sockHost,
        pathname: sockPath,
        port: sockPort,
      },
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    devMiddleware: {
      // It is important to tell WebpackDevServer to use the same "publicPath" path as
      // we specified in the webpack config. When homepage is '.', default to serving
      // from the root.
      // remove last slash so user can land on `/test` instead of `/test/`
      publicPath: paths.publicUrlOrPath.slice(0, -1),
    },

    https: getHttpsConfig(),
    host,
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebook/create-react-app/issues/387.
      disableDotRule: true,
      index: paths.publicUrlOrPath,
    },
    proxy,
    onBeforeSetupMiddleware(devServer) {
      // Keep `evalSourceMapMiddleware`
      // middlewares before `redirectServedPath` otherwise will not have any effect
      // This lets us fetch source contents from webpack for the error overlay
      devServer.app.use(evalSourceMapMiddleware(devServer))

      if (fs.existsSync(paths.proxySetup)) {
        // This registers user provided middleware for proxy reasons
        require(paths.proxySetup)(devServer.app)
      }
    },
    onAfterSetupMiddleware(devServer) {
      // Redirect to `PUBLIC_URL` or `homepage` from `package.json` if url not match
      devServer.app.use(redirectServedPath(paths.publicUrlOrPath))

      // This service worker file is effectively a 'no-op' that will reset any
      // previous service worker registered for the same host:port combination.
      // We do this in development to avoid hitting the production cache if
      // it used the same host and port.
      // https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
      devServer.app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath))
    },
  }
}
