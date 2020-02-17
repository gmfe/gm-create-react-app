const { PATH } = require('../util')
const fs = require('fs')

console.log('--> config')

try {
  // .js .json 都可以
  const deploy = require(PATH.appConfig + '/deploy')

  if (!deploy.publicPath) {
    console.error('/config/deploy 需提供 publicPath')
  }
} catch (err) {
  console.error('没有 /config/deploy 配置文件，生成文件  /config/deploy.js')

  fs.writeFileSync(
    PATH.appConfig + '/deploy.js',
    `module.exports = {
  publicPath: '//js.guanmai.cn/build/my-project/'
}
`
  )
}
