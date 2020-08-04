const sh = require('shelljs')
const fs = require('fs-extra')
const path = require('path')

const appDirectory = fs.realpathSync(process.cwd())
const resolvePath = (relativePath) => path.resolve(appDirectory, relativePath)

function shellExec(com) {
  if (sh.exec(com).code !== 0) {
    sh.exit(1)
  }
}

function getLibVersion() {
  const lerna = require(appDirectory + '/lerna.json')
  return lerna.version
}

function getScope() {
  return appDirectory.split('/').slice(-1)[0]
}

function getFiles(dirPath, files = []) {
  const filesList = fs.readdirSync(dirPath)

  filesList.forEach((v) => {
    const filePath = path.join(dirPath, v)

    const fileObj = {
      path: filePath,
    }

    const stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      fileObj.type = 'dir'
      files.push(fileObj)

      getFiles(filePath, files)
    } else {
      fileObj.type = 'file'
      files.push(fileObj)
    }
  })

  return files
}

const PATH = {
  appDirectory,
  libPackages: resolvePath('packages'),
  template: path.join(__dirname, './template'),
}

module.exports = { PATH, shellExec, getLibVersion, getScope, getFiles }
