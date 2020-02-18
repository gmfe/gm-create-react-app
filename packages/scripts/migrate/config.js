const { PATH } = require('../util')
const fs = require('fs-extra')

console.log('--> config')

if (fs.existsSync(PATH.appConfig + '/deploy.json')) {
  console.error('请迁移 deploy.json 到 deply.js')
}

if (fs.existsSync(PATH.appConfig + '/local.json')) {
  console.error('请迁移 local.json 到 local.js')
}

try {
  const deploy = require(PATH.appConfig + '/deploy')

  if (!deploy.publicPath) {
    deploy.publicPath = '//js.guanmai.cn/build/my-project/'

    console.error('/config/deploy 需提供 publicPath，请自行添加')
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
