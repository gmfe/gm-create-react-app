/*
 * @Description: 根据不同的环境启动
 */
const shelljs = require('shelljs')
const getBranchUrl = require('./get_branch_url')
const { prompt } = require('inquirer')
const chalk = require('chalk')

const PLACEHOLDER = 'GM_ENV'
const BASE_URL = `https://${PLACEHOLDER}.guanmai.cn/`

function generateEnvPath(env) {
  let replaceURL = 'x'

  switch (env) {
    case 'lite':
      replaceURL = 'q'
      break
    default:
      replaceURL = 'env-'
      if (env === 'dev') {
        replaceURL += 'develop'
      } else {
        replaceURL += getBranchUrl()
      }
      replaceURL += '.x.k8s'
      break
  }
  const target = BASE_URL.replace(PLACEHOLDER, replaceURL)
  return target
}
const envs = ['lite', 'feature']

function startWithEnv(env) {
  process.env.GM_API_ENV = generateEnvPath(env)
  console.log(env, process.env.GM_API_ENV)
  shelljs.exec('yarn start')
}
module.exports = (defaultEnv) => {
  if (defaultEnv && !envs.includes(defaultEnv))
    return Promise.reject(chalk.redBright('输入环境不对，只允许' + envs))
  if (envs.includes(defaultEnv)) {
    startWithEnv(defaultEnv)
    return Promise.resolve(defaultEnv)
  } else {
    return prompt([
      {
        type: 'list',
        name: 'env',
        message: '请选择以下环境启动',
        default: generateEnvPath('feature'),
        choices: envs,
        validate: (env) => {
          if (!env) return chalk.redBright('请选择以下任一环境启动' + envs)
          return true
        },
      },
    ]).then(({ env }) => {
      startWithEnv(env)
      return env
    })
  }
}
