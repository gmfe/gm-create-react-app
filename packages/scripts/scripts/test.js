// 设置好环境
process.env.BABEL_ENV = 'test'
process.env.NODE_ENV = 'test'

process.on('unhandledRejection', (err) => {
  throw err
})

const { shellExec, initGitEnv } = require('../util')

initGitEnv()

shellExec(
  'webpack --color --config ' + require.resolve('../config/webpack.config'),
)
