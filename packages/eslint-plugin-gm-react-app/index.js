const createIndex = require('create-eslint-index')
const importModules = require('import-modules')
const rules = importModules('lib/rules', { camelize: false })

const recommendedRules = createIndex.createConfig(
  {
    plugin: 'gm-react-app',
    field: 'meta.docs.recommended'
  },
  rules
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
        'prettier',
        'prettier/react',
        'prettier/standard'
      ],
      plugins: ['gm-react-app', 'prettier'],
      rules: {
        // TODO
        // 'prettier/prettier': 'error',
        ...recommendedRules,
        'react/display-name': 0,
        'react/no-find-dom-node': 0,
        'react/prop-types': [
          2,
          { ignore: ['children', 'location', 'params', 'match'] }
        ],
        'react/jsx-handler-names': 1,
        camelcase: 0,

        'import/no-unresolved': [1, { ignore: ['^gm-i18n$'] }],
        'import/default': 'off',
        'import/namespace': 'off',
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-duplicates': 'off'
      },
      settings: {
        react: {
          version: 'detect'
        },
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx']
        },
        'import/resolver': {
          // use <root>/tsconfig.json
          typescript: {
            alwaysTryTypes: true
          }
        }
      },
      // TODO
      overrides: [
        {
          files: ['*.tsx', '*.ts'],
          plugins: ['@typescript-eslint'],
          parser: '@typescript-eslint/parser',
          extends: [
            'plugin:react/recommended',
            'plugin:@typescript-eslint/recommended',
            'prettier/@typescript-eslint',
            'plugin:prettier/recommended'
          ],
          rules: {
            'react/prop-types': 'off',
            'import/no-unresolved': 'off',
            'prettier/prettier': 'error',
            '@typescript-eslint/ban-ts-ignore': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-empty-interface': 'off',
            '@typescript-eslint/camelcase': 'off',
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/member-naming': [
              'error',
              {
                private: '^_',
                protected: '^__'
              }
            ],
            'react/display-name': 'off'
          },
          parserOptions: {
            project: './tsconfig.json',
            ecmaFeatures: {
              jsx: true
            },
            sourceType: 'module',
            ecmaVersion: 2020
          }
        }
      ]
    }
  }
}
