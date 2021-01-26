const { processRem, processFontSizeRem } = require('./util')
const defaultConfig = require('tailwindcss/defaultConfig')

const config = {
  ...defaultConfig,
  prefix: 'tw-',
  // 提高优先级
  important: true,
}

Object.assign(config.theme.colors, {
  default: 'var(--gm-color-default)',
  primary: 'var(--gm-color-primary)',
  success: 'var(--gm-color-success)',
  danger: 'var(--gm-color-danger)',
})

processRem(config.theme.spacing)
processRem(config.theme.borderRadius)

processFontSizeRem(config.theme.fontSize)

module.exports = config
