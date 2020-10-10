const { resolve } = require
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
      parser: 'babel-eslint',
      extends: [
        'standard',
        'standard-jsx',
        'plugin:react/recommended',
        'plugin:import/warnings',
        'plugin:import/errors',
        'plugin:promise/recommended',
        'prettier',
        'prettier/react',
        'prettier/standard',
      ],
      plugins: ['gm-react-app', 'react-hooks', 'prettier', 'promise'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
      },
      rules: {
        ...recommendedRules,
        'prettier/prettier': 1,
        'react/display-name': 0,
        'react/no-find-dom-node': 0,
        'react/prop-types': [
          2,
          { ignore: ['children', 'location', 'params', 'match'] },
        ],
        'react/jsx-handler-names': 1,
        'react/jsx-pascal-case': 0,
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        camelcase: 0,
        'import/no-unresolved': [1, { ignore: ['^gm-i18n$'] }],
        'import/default': 'off',
        'import/namespace': 'off',
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-duplicates': 'off',
        'promise/catch-or-return': 'off',
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
      globals: {
        wx: true,
      },
      overrides: [
        {
          files: ['**/*.ts', '**/*.tsx'],
          parser: '@typescript-eslint/parser',
          extends: [
            'standard',
            'standard-jsx',
            'plugin:react/recommended',
            'plugin:import/warnings',
            'plugin:import/errors',
            'plugin:import/typescript',
            'prettier',
            'prettier/react',
            'prettier/standard',
            'prettier/@typescript-eslint',
          ],
          plugins: [
            'gm-react-app',
            'react-hooks',
            '@typescript-eslint',
            'prettier',
          ],
          parserOptions: {
            ecmaFeatures: {
              jsx: true,
            },
            ecmaVersion: 2020,
            sourceType: 'module',
          },
          settings: {
            'import/resolver': {
              typescript: {
                project: path.resolve(appDirectory, 'tsconfig.json'),
              },
            },
          },
          rules: {
            'prettier/prettier': 'error',
            ...recommendedRules,
            camelcase: 'off',
            'react/prop-types': 'off',
            '@typescript-eslint/member-naming': [
              'error',
              {
                private: '^_',
                protected: '^__',
              },
            ],
            'react/display-name': 0,
            'react/no-find-dom-node': 0,
            'react/jsx-pascal-case': 0,
            'react/jsx-handler-names': [
              'error',
              {
                eventHandlerPrefix: '_handle',
              },
            ],
            'import/extensions': [
              2,
              'ignorePackages',
              { ts: 'never', tsx: 'never', json: 'always', js: 'never' },
            ],
            'no-unused-vars': 'off',
            'no-useless-constructor': 'off',
            '@typescript-eslint/no-useless-constructor': 'error',
            'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
            'react/state-in-constructor': [2, 'never'],
            '@typescript-eslint/no-empty-interface': 'warn',
            'react/button-has-type': 0,
            'no-undef': 0,
            'import/default': 'off',
          },
        },
      ],
    },
  },
}
