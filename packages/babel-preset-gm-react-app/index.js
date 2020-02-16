module.exports = api => {
  api.assertVersion('^7.0.0')

  return {
    sourceType: 'unambiguous', // 自动推断编译的模块类型(cjs,es6)
    // 插件顺序从前往后
    plugins: [
      ['@babel/plugin-proposal-class-properties', { loose: true }],

      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true
        }
      ],
      '@babel/plugin-proposal-function-bind',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-runtime',
      'react-hot-loader/babel',
      'styled-jsx/babel'
    ],
    // 从后往前
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          // for tree shaking
          modules: false
        }
      ]
    ]
  }
}
