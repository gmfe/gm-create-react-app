// 设置好环境
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

process.on('unhandledRejection', (err) => {
  throw err
})

const { shellExec, initGitEnv } = require('../util')

initGitEnv()

shellExec(
  'webpack-dev-server --color --config ' +
    require.resolve('../config/webpack.config'),
)
