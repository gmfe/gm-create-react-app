const sh = require('shelljs')
const fs = require('fs-extra')
const path = require('path')

const libDirectory = fs.realpathSync(process.cwd())
const resolveLib = (relativePath) => path.resolve(libDirectory, relativePath)

function shellExec(com) {
  if (sh.exec(com).code !== 0) {
    sh.exit(1)
  }
}

function getVersion() {
  const lerna = require(libDirectory + '/lerna.json')
  return lerna.version
}

function getScope() {
  return libDirectory.split('/').slice(-1)[0]
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
  libDirectory,
  libPackages: resolveLib('packages'),
  template: path.join(__dirname, './template'),
}

module.exports = { PATH, shellExec, getVersion, getScope, getFiles }
