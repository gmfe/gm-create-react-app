process.on('unhandledRejection', (err) => {
  throw err
})

const fs = require('fs-extra')
const template = require('art-template')
const { PATH, getFiles, shellExec } = require('../util')

const projectName = process.argv[2]

if (!projectName) {
  console.error('提供项目名')
  process.exit(1)
}

console.log('create project', projectName)

const projectPath = PATH.appDirectory + '/' + projectName
const tempPath = PATH.template + '/project-ts'

const data = {
  name: projectName,
}

const files = getFiles(tempPath)

fs.mkdirpSync(projectPath)

files.forEach(({ path, type }) => {
  const targetPath = projectPath + path.replace(tempPath, '')

  if (type === 'dir') {
    fs.mkdirpSync(targetPath)
  } else {
    const parseContent = template(path, data)
    fs.writeFileSync(targetPath, parseContent)
  }
})

console.log('create project done')
console.log('lerna bootstrap')
shellExec('lerna bootstrap')
