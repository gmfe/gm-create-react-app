module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'WIP',
        'feat',
        'fix',
        'style',
        'revert',
        'docs',
        'chore',
        'build',
        'perf',
        'refactor',
        'test',
        'ci',
      ],
    ],
    'type-case': [2, 'always', ['lower-case', 'upper-case']],
  },
}
