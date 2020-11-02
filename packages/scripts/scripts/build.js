// 设置好环境
process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

process.on('unhandledRejection', (err) => {
  throw err
})

const { shellExec, initGitEnv } = require('../util')

initGitEnv()

shellExec(
  'webpack -p --color --config ' + require.resolve('../config/webpack.config'),
)
