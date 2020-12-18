const postcss = require('postcss')

function isSupportedRule(selector) {
  // 小程序需不支持
  //  :not (注意前面有空格。xxx:not 是支持的，微信的伪类需要再元素上使用)
  // *
  if (selector.includes(' :not') || selector.includes('*')) {
    return false
  }

  return true
}

module.exports = postcss.plugin('postcss-mp-tailwind', (options = {}) => {
  return (root) => {
    root.walkRules((rule) => {
      if (rule.parent.name === 'media') {
        rule.parent.remove()
      }

      if (!isSupportedRule(rule.selector)) {
        rule.remove()
      }
    })
  }
})
