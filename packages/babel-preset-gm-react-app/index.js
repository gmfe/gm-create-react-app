module.exports = api => {
  api.assertVersion('^7.0.0')

  return {
    sourceType: 'unambiguous', // 自动推断编译的模块类型(cjs,es6)
    // 插件顺序从前往后
    plugins: [
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true
        }
      ],
      // TODO
      // 'react-hot-loader/babel',
      '@babel/plugin-syntax-dynamic-import',
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-function-bind',
      '@babel/plugin-proposal-optional-chaining',
      'styled-jsx/babel'
    ],
    // 从后往前
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage'
        }
      ],
      [
        '@babel/preset-typescript',
        {
          isTSX: true,
          allExtensions: true
        }
      ]
    ]
  }
}
