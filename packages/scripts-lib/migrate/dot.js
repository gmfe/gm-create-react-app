const { PATH } = require('../util')
const fs = require('fs-extra')
const _ = require('lodash')

console.log('--> dot')

fs.writeFileSync(
  PATH.appDirectory + '/.eslintrc.js',
  `const path = require('path')

module.exports = {
  extends: ['plugin:gm-react-app/recommended'],
  settings: {
    'import/resolver': {
      // 配置 alias,和 webpack config.resolver.alias 保持一致即可
      'gmfe-alias': {
        common: path.resolve(__dirname, 'src/js/common/'),
        stores: path.resolve(__dirname, 'src/js/stores/'),
        svg: path.resolve(__dirname, 'src/svg/'),
        img: path.resolve(__dirname, 'src/img/'),
      },
    },
  },
}
`,
)

fs.writeFileSync(
  PATH.appDirectory + '/jsconfig.json',
  `{
  "compilerOptions":{
    "baseUrl": ".",
    "paths": {
      "common/*": ["src/js/common/*"],
      "stores/*": ["src/js/stores/*"],
      "svg/*": ["src/js/svg/*"],
      "img/*": ["src/img/*"]
    },
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
`,
)

fs.writeFileSync(
  PATH.appDirectory + '/tsconfig.json',
  `{
  "extends": "ts-config-gm-react-app/tsconfig",
  "include": ["node_modules/@gm-common/**/global.d.ts"]
}
`,
)

const gitIgnore = `.DS_Store
.idea
.vscode
lerna-debug.log
node_modules/
npm-debug.log
yarn-error.log
.stylelintcache
.eslintcache
*.less.json
config/local.js
build/
`
const readGitIgnore = fs.readFileSync(PATH.appDirectory + '/.gitignore', {
  encoding: 'utf-8',
})

fs.writeFileSync(
  PATH.appDirectory + '/.gitignore',
  _.uniq(gitIgnore.split('\n').concat(readGitIgnore.split('\n'))).join('\n'),
)

fs.writeFileSync(
  PATH.appDirectory + '/.prettierrc.js',
  `module.exports = {
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
}
`,
)

fs.writeFileSync(
  PATH.appDirectory + '/babel.config.js',
  `module.exports = (api) => {
  api.cache(true)

  return {
    presets: ['gm-react-app'],
  }
}
`,
)

fs.writeFileSync(
  PATH.appDirectory + '/.stylelintrc',
  `{
  "extends": "stylelint-config-standard"
}
`,
)

if (fs.existsSync(PATH.appDirectory + '/.babelrc.json')) {
  fs.removeSync(PATH.appDirectory + '/.babelrc.json')
}

if (fs.existsSync(PATH.appDirectory + '/.babelrc')) {
  fs.removeSync(PATH.appDirectory + '/.babelrc')
}

if (fs.existsSync(PATH.appDirectory + '/.svgrrc.json')) {
  fs.removeSync(PATH.appDirectory + '/.svgrrc.json')
}

if (fs.existsSync(PATH.appDirectory + '/postcss.config.js')) {
  fs.removeSync(PATH.appDirectory + '/postcss.config.js')
}
