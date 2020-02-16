# 自测

# 性能分析

# TODO

webpack 自定义

js include resolve alias

react-hot-loader

template

# 说明

## 文件夹

```
my-project
  build/
  config/
    deploy.js
    local.js
    index.html
  src/
    index.js
  

```

入口 /src/index.js

配置 /config/deploy.js /config/local.js

```javascript
module.exports = {
  // 生产必填，开发默认 '/build/'
  publicPath: '//js.guanmai.cn/build/xxxx/',
  // 默认 8080
  port: 8080,
  // 默认不启用
  https: false,
  proxy: {
    '/core/*': {
      target: 'url',
      changeOrigin: true
    }
  }
}
```

## package.json

包含以下内容

```json
{
  "scripts": {
    "start": "gm-react-app-scripts start",
    "build:test": "gm-react-app-scripts test",
    "build:prod": "gm-react-app-scripts build"
  },
  "lint-staged": {
    "./src/**/*.{js,json}": [
      "eslint --cache --fix",
      "git add"
    ],
    "./src/**/*.{less,css}": [
      "stylelint --cache --fix",
      "git add"
    ]
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "browserslist": {
    "production": [
      "iOS >= 8",
      "Android >= 5.0"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

- config
  - deploy.js
- template
  - index.html 即可
- html
  - meta
  - babel-polyfill
  - fetch
- package
  - browserslist
- .xxx
  - eslint
  - prettier
  - svgr
  - babel.config.js
  - gitignore
- react-hot-loader 
  - app.js hot
 
# 大文件

moment

_lodash 不考虑优化，会影响 hash 不稳定_
