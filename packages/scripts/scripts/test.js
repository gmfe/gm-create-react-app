// 设置好环境
process.env.BABEL_ENV = 'test'
process.env.NODE_ENV = 'test'

process.on('unhandledRejection', (err) => {
  throw err
})

const { shellExec } = require('../util')

shellExec(
  'webpack --color --config ' + require.resolve('../config/webpack.config'),
)
