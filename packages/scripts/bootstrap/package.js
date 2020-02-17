const { PATH } = require('../util')
const fs = require('fs')
console.log('--> package.json')

const json = require(PATH.appPackageJson)

if (!json.version) {
  json.version = '1.0.0'
}

json.scripts.start = 'gm-react-app-scripts start'
json.scripts['build:test'] = 'gm-react-app-scripts test'
json.scripts['build:prod'] = 'gm-react-app-scripts build'

json['lint-staged'] = {
  './src/**/*.{js,json}': ['eslint --cache --fix', 'git add'],
  './src/**/*.{less,css}': ['stylelint --cache --fix', 'git add']
}

json.husky = {
  hooks: {
    'pre-commit': 'lint-staged'
  }
}

json.browserslist = {
  production: ['iOS >= 8', 'Android >= 5.0'],
  development: [
    'last 1 chrome version',
    'last 1 firefox version',
    'last 1 safari version'
  ]
}

// TODO check dependencies devDependencies

fs.writeFileSync(PATH.appPackageJson, JSON.stringify(json, null, 2))
