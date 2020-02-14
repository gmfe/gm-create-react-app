const path = require('path')

module.exports = {
  extends: ['plugin:gm-react-app/recommended'],
  settings: {
    'import/resolver': {
      // 配置 alias,和 webpack config.resolver.alias 保持一致即可
      'gmfe-alias': {
        common: path.resolve(__dirname, 'js/common/'),
        stores: path.resolve(__dirname, 'js/stores/'),
        svg: path.resolve(__dirname, 'svg/'),
        img: path.resolve(__dirname, 'img/')
      }
    }
  }
}
