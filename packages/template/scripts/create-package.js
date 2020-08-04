process.on('unhandledRejection', (err) => {
  throw err
})

const fs = require('fs-extra')
const template = require('art-template')
const argv = require('yargs').argv
const { PATH, getLibVersion, getScope, getFiles, shellExec } = require('../util')

const packageName = process.argv[2]
const isTs = !!argv.ts

if (!packageName) {
  console.error('提供包名')
  process.exit(1)
}

console.log('create package', packageName)

const data = {
  scope: getScope(),
  name: packageName,
  version: getLibVersion(),
}

const packagePath = PATH.libPackages + '/' + packageName
const tempPath = PATH.template + (isTs ? '/package-ts' : '/package-js')

const files = getFiles(tempPath)

fs.mkdirpSync(packagePath)

files.forEach(({ path, type }) => {
  const targetPath = packagePath + path.replace(tempPath, '')

  if (type === 'dir') {
    fs.mkdirpSync(targetPath)
  } else {
    const parseContent = template(path, data)
    fs.writeFileSync(targetPath, parseContent)
  }
})

console.log('create package done')

console.log('lerna bootstrap')
shellExec('lerna bootstrap')
