const fs = require('fs-extra')
const path = require('path')
const { prompt } = require('inquirer')
const chalk = require('chalk')
const paths = require('../config/paths')

const pagesPath = path.resolve(paths.appSrc, 'pages')
const saveCachePath = path.resolve(
  process.cwd(),
  'node_modules/.cache/.start_page.json',
)
fs.ensureFileSync(saveCachePath)
const dirs = fs.readdirSync(pagesPath).filter((p) => {
  const absolutePath = path.resolve(pagesPath, p)
  return fs.statSync(absolutePath).isDirectory()
})

let defaultChoices = []
try {
  defaultChoices = require(saveCachePath)
} catch (e) {
  // 有可能json为空，所以catch一下
}
console.log(process.argv.slice(2))
prompt([
  {
    type: 'checkbox',
    name: 'pages',
    message: '请选择以下目录启动',
    default: defaultChoices,
    choices: dirs,
    validate: (pages) => {
      if (!pages.length) return chalk.redBright('请选择至少选择任一页面启动')
      return true
    },
  },
]).then(async ({ pages }) => {
  const defaultEnv = process.argv.slice(2)[0]
  await require('./start_with_env')(defaultEnv)
  fs.writeJSON(saveCachePath, pages)
  const regExpStr = `/^\\.\\/(${pages.join('|')}).*?index\\.page\\./`
  process.env.CUSTOM_AUTO_ROUTER_REG_ = regExpStr
  return null
})
