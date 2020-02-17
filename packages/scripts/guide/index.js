const { PATH } = require('../util')
const fs = require('fs-extra')

console.log('begin bootstrap')

console.log('--> 文件')

if (fs.existsSync(PATH.appBuild)) {
  fs.removeSync(PATH.appBuild)
}

if (!fs.existsSync(PATH.appIndexJs)) {
  console.error('请提供 /src/index.js')
}

require('./config')
require('./package')
require('./dot')
require('./template')

console.log('--> react hot')

const indexJs = fs.readFileSync(PATH.appIndexJs, { encoding: 'utf-8' })
if (!indexJs.includes('react-hot-loader/root')) {
  console.warn(
    '请设置好 /src/index.js 内引入 react-hot-loader，具体 https://github.com/gaearon/react-hot-loader'
  )
}

if (fs.existsSync(PATH.appDirectory + '/webpack.config.dll.js')) {
  fs.removeSync(PATH.appDirectory + '/webpack.config.dll.js')
}

if (fs.existsSync(PATH.appDirectory + '/webpack.config.js')) {
  fs.removeSync(PATH.appDirectory + '/webpack.config.js')
}
