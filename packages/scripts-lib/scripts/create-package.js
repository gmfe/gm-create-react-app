process.on('unhandledRejection', (err) => {
  throw err
})

const fs = require('fs-extra')
const template = require('art-template')
const argv = require('yargs').argv
const { PATH, getVersion, getScope, getFiles } = require('../util')

const packageName = process.argv[2]
const isTs = !!argv.ts

if (!packageName) {
  console.error('提供包名')
  process.exit(1)
}

const packagePath = PATH.libPackages + '/' + packageName

const data = {
  scope: getScope(),
  name: packageName,
  version: getVersion(),
}

const files = getFiles(PATH.template)

fs.mkdirpSync(packagePath)

files.forEach(({ path, type }) => {
  const targetPath =
    packagePath +
    path.replace(PATH.template + (isTs ? '/template-ts' : '/template-js'), '')

  if (type === 'dir') {
    fs.mkdirpSync(targetPath)
  } else {
    const parseContent = template(path, data)
    fs.writeFileSync(targetPath, parseContent)
  }
})
