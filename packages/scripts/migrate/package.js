const { PATH } = require('../util')
const fs = require('fs-extra')
const _ = require('lodash')

console.log('--> package.json')

const json = require(PATH.appPackageJson)

if (!json.version) {
  json.version = '1.0.0'
}

if (!json.aliasName) {
  console.log('请提供 aliasName')
}

if (!json.clientName) {
  console.log('请提供 clientName')
}

json.scripts.start = 'gras start'
json.scripts['build:test'] = 'gras test'
json.scripts['build:prod'] = 'gras build'

json['lint-staged'] = {
  './src/**/*.{ts,tsx,js,json}': ['eslint --cache --fix'],
  './src/**/*.{less,css}': ['stylelint --cache --fix'],
}

json.husky = {
  hooks: {
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    'pre-commit': 'lint-staged',
  },
}

json.browserslist = {
  production: ['iOS >= 8', 'Android >= 5.0'],
  development: [
    'last 1 chrome version',
    'last 1 firefox version',
    'last 1 safari version',
  ],
}

json.commitlint = {
  extends: ['@gm-react-app/commitlint-gm-react-app'],
}

delete json.babel

const babelDependencies = require('babel-preset-gm-react-app/package')
  .dependencies

const eslintDependencies = require('eslint-plugin-gm-react-app/package')
  .dependencies
delete eslintDependencies.lodash

const scriptsDependencies = require('@gm-react-app/scripts/package')
  .dependencies

const app = require(PATH.appDirectory + '/package')

const dep = Object.assign(
  {},
  babelDependencies,
  eslintDependencies,
  scriptsDependencies,
)
const sameDeps = _.intersection(
  _.keys(app.dependencies).concat(_.keys(app.devDependencies)),
  _.keys(dep),
)

if (sameDeps.length > 0) {
  console.warn('package.json dependencies 可以不用列' + sameDeps)
}

fs.writeFileSync(PATH.appPackageJson, JSON.stringify(json, null, 2))
