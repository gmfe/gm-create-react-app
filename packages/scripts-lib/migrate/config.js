const { PATH } = require('../util')
const fs = require('fs-extra')

console.log('--> config')

try {
  const deploy = require(PATH.appConfig + '/deploy')

  if (!deploy.publicPath) {
    deploy.publicPath = '//js.guanmai.cn/build/my-project/'

    console.error('/config/deploy 需提供 publicPath，请自行添加')
  }
} catch (err) {
  console.error('没有 /config/deploy.js 配置文件，生成文件  /config/deploy.js')

  fs.writeFileSync(
    PATH.appConfig + '/deploy.js',
    `module.exports = {
  publicPath: '//js.guanmai.cn/build/my-project/',
}
`,
  )
}

try {
  const local = require(PATH.appConfig + '/local')
  if (local.proxy && local.proxy[0] && !local.proxy[0].context) {
    console.warn(`
proxy 可参考以下方式设置

{
  proxy: [
    {
      context: [
        '/xxx',
        '/xxx',
      ],
      target: 'httpxxxxxx',
      changeOrigin: true,
    },
  ],
}
`)
  }
} catch (err) {}

try {
  const sample = require(PATH.appConfig + '/sample.local')
  if (sample.proxy && sample.proxy[0] && !sample.proxy[0].context) {
    console.warn(`
proxy 可参考以下方式设置

{
  proxy: [
    {
      context: [
        '/xxx',
        '/xxx',
      ],
      target: 'httpxxxxxx',
      changeOrigin: true,
    },
  ],
}
`)
  }
} catch (err) {
  console.warn('没有找到 config/sample.local.js 文件')
}
