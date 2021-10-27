module.exports = (api, options = {}) => {
  api.assertVersion('^7.0.0')

  const { closePolyfill } = options

  const presetEnvOption = {
    // for tree shaking
    modules: false,
  }
  let pluginTransformRuntimeOption = {}

  if (!closePolyfill) {
    Object.assign(presetEnvOption, {
      useBuiltIns: 'usage',
      corejs: 3,
    })

    pluginTransformRuntimeOption = { corejs: 3 }
  }

  return {
    sourceType: 'unambiguous', // 自动推断编译的模块类型(cjs,es6)
    // exclude: [/@babel[/|\\\\]runtime/, /core-js/],
    // 插件顺序从前往后
    plugins: [
      // decorators 需要再 class-properties 前
      [
        require('@babel/plugin-proposal-decorators'),
        {
          legacy: true,
        },
      ],
      [require('@babel/plugin-proposal-class-properties'), { loose: true }],
      require('@babel/plugin-proposal-function-bind'),
      require('@babel/plugin-proposal-object-rest-spread'),
      require('@babel/plugin-proposal-nullish-coalescing-operator'),
      require('@babel/plugin-proposal-optional-chaining'),
      require('@babel/plugin-syntax-dynamic-import'),
      [
        require('@babel/plugin-transform-runtime'),
        pluginTransformRuntimeOption,
      ],
      require('styled-jsx/babel'),
      require('babel-plugin-lodash'),
      require('react-hot-loader/babel'),
      require('babel-plugin-mobx-deep-action'),
    ],
    // 从后往前
    presets: [
      require('@babel/preset-react'),
      [require('@babel/preset-env'), presetEnvOption],
      require('@babel/preset-typescript'),
    ],
  }
}
