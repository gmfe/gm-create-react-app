const {
  processDotAndRem,
  processFontSize,
  processDivide,
  processTheme,
} = require('./util')
const defaultConfig = require('tailwindcss/defaultConfig')

const config = {
  ...defaultConfig,
  separator: '_',
  prefix: 'tw-',
  important: true,
  corePlugins: {
    // 不加载 modern-normalize，小程序不支持
    preflight: false,
    accessibility: false,
    // screens: false,
    // 用了 :not，禁用。(注意前面有空格。xxx:not 是支持的，微信的伪类需要再元素上使用)
    space: false,
    divideColor: false,
    divideOpacity: false,
    divideWidth: false,
  },
}

// 移动端，只有一种尺寸，不需要 screens
config.theme.screens = {}
// config.theme.colors = {}

processDotAndRem(config.theme.spacing)
processDotAndRem(config.theme.borderRadius)

processFontSize(config.theme.fontSize)

// 这些是函数，先转成obj
processTheme(config, 'height')
processDivide(config.theme.height)
processTheme(config, 'inset')
processDivide(config.theme.inset)
processTheme(config, 'translate')
processDivide(config.theme.translate)
processTheme(config, 'width')
processDivide(config.theme.width)

module.exports = config
