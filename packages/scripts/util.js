const fs = require('fs-extra')
const sh = require('shelljs')
const path = require('path')

const env = process.env.NODE_ENV
const isEnvDevelopment = env === 'development'
const isEnvTest = env === 'test'
const isEnvProduction = env === 'production'

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

function shellExec(com) {
  if (sh.exec(com).code !== 0) {
    sh.exit(1)
  }
}

const getLocalConfig = () => {
  let config = {}
  try {
    config = require(appDirectory + '/config/local')
  } catch (err) {
    // nothing
  }

  return config
}

const getConfig = () => {
  let config
  try {
    config = require(appDirectory + '/config/deploy')
  } catch (err) {
    throw new Error('没有找到 /config/deploy.js 文件')
  }

  // 开发默认 /build/
  if (isEnvDevelopment) {
    config.publicPath = '/build/'
  }

  // local 覆盖 deploy
  Object.assign(config, getLocalConfig())

  // 开发环境需要提供 publicPath
  if (!isEnvDevelopment && !config.publicPath) {
    throw new Error('production 没有提供 publicPath 字段')
  }

  return config
}

const PATH = {
  appDirectory,
  appBuild: resolveApp('build'),
  appConfig: resolveApp('config'),
  appSrc: resolveApp('src'),
  appIndexTemplate: resolveApp('src/index.html'),
  appIndexJs: resolveApp('src/index'),
  appPackageJson: resolveApp('package.json'),
}

// query-string swiper dom7 比较坑爹，里面用了 const
const commonInclude = [
  PATH.appSrc,
  /gm_api/,
  /gm-/,
  /gmfe/,
  /gm_static_storage/,
  /react-mgm/,
  /react-gm/,
  /query-string/,
  /split-on-first/,
  /strict-uri-encode/,
  /swiper/,
  /dom7/,
]

const packageJson = JSON.parse(fs.readFileSync(PATH.appPackageJson))

function initGitEnv() {
  if (process.env.GIT_COMMIT || process.env.GIT_BRANCH) return
  const commit = sh
    .exec('git rev-parse HEAD', { silent: true })
    .stdout.replace('\n', '')
  const branch = sh
    .exec('git rev-parse --abbrev-ref HEAD', { silent: true })
    .stdout.replace('\n', '')

  process.env.GIT_COMMIT = commit
  process.env.GIT_BRANCH = branch
}

module.exports = {
  isEnvDevelopment,
  isEnvTest,
  isEnvProduction,
  appDirectory,
  PATH,
  packageJson,
  commonInclude,
  shellExec,
  getConfig,
  initGitEnv,
}
