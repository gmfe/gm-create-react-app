const _ = require('lodash')

// rem 转换成 px。不使用 rem。
// 0.125rem => 2.5px
// 0.25rem => 5px
function remToPx(str, getPx = (v) => v * 20) {
  if (!str.endsWith('rem')) {
    return str
  }

  const rem = str.slice(0, -3)
  return `${getPx(rem)}px`
}

function dotToUnder(str) {
  return str.replace('.', 'd')
}

function processRem(obj) {
  _.forIn(obj, (v, k) => {
    obj[k] = remToPx(v)
  })
}

// { 1.5: '0.375rem' } => { 1_5: '7.5px' }
function processDotAndRem(obj) {
  _.forIn(obj, (v, k) => {
    // 移除小数点
    if (k.includes('.')) {
      obj[dotToUnder(k)] = remToPx(v)
      delete obj[k]
    } else {
      obj[k] = remToPx(v)
    }
  })
}

// xs: ['0.75rem', { lineHeight: '1rem' }],
function processFontSizeRem(obj) {
  const getPx = (v) => v * 16
  _.forIn(obj, (v, k) => {
    obj[k] = [
      remToPx(v[0], getPx),
      {
        lineHeight: remToPx(v[1].lineHeight, getPx),
      },
    ]
  })
}

function processDivide(obj) {
  _.forIn(obj, (v, k) => {
    if (k.includes('/')) {
      obj[k.replace('/', 'f')] = v
      delete obj[k]
    }
  })
}

// 具体看 defaultConfig.stub.js 的逻辑
function processTheme(config, theme) {
  config.theme[theme] = config.theme[theme]((theme) => config.theme[theme], {
    negative: (obj) => _.mapKeys(obj, (v, k) => `-${k}`),
    // TODO 暂时没研究，貌似用处不大
    breakpoints: (obj) => ({}),
  })
}

module.exports = {
  processRem,
  processDotAndRem,
  processFontSizeRem,
  processDivide,
  processTheme,
}
