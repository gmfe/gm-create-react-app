const createIndex = require('create-eslint-index')
const importModules = require('import-modules')
const fs = require('fs-extra')
const rules = importModules('lib/rules', { camelize: false })
const path = require('path')

const appDirectory = fs.realpathSync(process.cwd())

const recommendedRules = createIndex.createConfig(
  {
    plugin: 'gm-react-app',
    field: 'meta.docs.recommended',
  },
  rules,
)

module.exports = {
  rules,
  configs: {
    recommended: {
      parser: '@typescript-eslint/parser',
      extends: [
        'standard',
        'standard-jsx',
        'plugin:react/recommended',
        'plugin:import/warnings',
        'plugin:import/errors',
        'plugin:import/typescript',
        'plugin:promise/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/react',
        'prettier/standard',
        'prettier/@typescript-eslint',
      ],
      plugins: ['gm-react-app', 'promise', '@typescript-eslint', 'prettier'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      rules: {
        ...recommendedRules,
        camelcase: 'off',
        // 和 ts 冲突
        'no-undef': 'off',
        'prettier/prettier': 'warn',
        // 'react/display-name': 0,
        // 'react/no-find-dom-node': 0,
        // 'react/jsx-handler-names': 1,
        // 为了 gm_api 生成的组件
        'react/jsx-pascal-case': 0,
        // FC children 问题。 and ts 会检测，关掉还好
        'react/prop-types': 'off',
        // 把强制 promise 带 catch 关掉
        'promise/catch-or-return': 'off',
        // webpack
        'import/no-unresolved': [1, { ignore: ['^gm-i18n$'] }],
        // import * as xxxx
        // 'import/namespace': 'off',
        'import/default': 'off',
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off'
      },
      settings: {
        react: {
          version: 'detect',
        },
        'import/resolver': {
          typescript: {
            project: [
              require.resolve('ts-config-gm-react-app/tsconfig.json'),
              path.resolve(appDirectory, 'tsconfig.json'),
            ],
          },
        },
      },
      globals: {
        wx: true,
      },
    },
  },
}
