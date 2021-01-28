const { processRem, processFontSizeRem } = require('./util')
const defaultConfig = require('tailwindcss/defaultConfig')

const config = {
  ...defaultConfig,
  prefix: 'tw-',
  // 提高优先级
  important: true,
}

config.theme.screens = {
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

// 主题色
Object.assign(config.theme.colors, {
  default: 'var(--gm-color-default)',
  secondary: 'var(--gm-color-secondary)',
  desc: 'var(--gm-color-desc)',
  primary: 'var(--gm-color-primary)',
  'primary-light': 'var(--gm-color-bg-primary-light)',
  'primary-active': 'var(--gm-color-primary-active)',
  success: 'var(--gm-color-success)',
  danger: 'var(--gm-color-danger)',
  back: 'var(--gm-color-bg-back)',
})

processRem(config.theme.spacing)
processRem(config.theme.borderRadius)

processFontSizeRem(config.theme.fontSize)

module.exports = config
