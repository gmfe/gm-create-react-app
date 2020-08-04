const fs = require('fs-extra')
const path = require('path')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

const PATH = {
  appDirectory,
  appConfig: resolveApp('config'),
  appPackageJson: resolveApp('package.json'),
}

module.exports = { PATH }
