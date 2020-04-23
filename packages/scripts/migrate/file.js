const { PATH } = require('../util')
const fs = require('fs-extra')

console.log('--> file')

if (fs.existsSync(PATH.appBuild)) {
  fs.removeSync(PATH.appBuild)
}

if (!fs.existsSync(PATH.appIndexJs)) {
  console.error('请提供 /src/index.js')
}

if (fs.existsSync(PATH.appDirectory + '/webpack.config.dll.js')) {
  fs.removeSync(PATH.appDirectory + '/webpack.config.dll.js')
}

if (fs.existsSync(PATH.appDirectory + '/webpack.config.js')) {
  fs.removeSync(PATH.appDirectory + '/webpack.config.js')
}

if (fs.existsSync(PATH.appDirectory + '/webpack.config.monitor.js')) {
  fs.removeSync(PATH.appDirectory + '/webpack.config.monitor.js')
}

if (fs.existsSync(PATH.appDirectory + '/Jenkinsfile')) {
  fs.removeSync(PATH.appDirectory + '/Jenkinsfile')
}

const movePath = ['/js', '/css', '/svg', '/img', '/locales']
movePath.forEach((p) => {
  if (fs.existsSync(PATH.appDirectory + p)) {
    fs.moveSync(PATH.appDirectory + p, PATH.appSrc + p)
  }
})
