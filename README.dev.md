# 自测

# 性能分析

# TODO

webpack 自定义

js include resolve alias

webpack-bundle-analyzer

@gmfe

# 说明

## 文件夹

```
my-project
  build/
  config/
    deploy.js
    local.js
  src/
    index.js
    index.html
  .eslintrc.js
  .gitignore
  .prettierrc.js
  .svgrrc.json
  babel.config.js
  package.json
  yarn.lock
```


入口 /src/index.js

模板 /src/index.html 支持 ejs 语法

配置 /config/deploy.js /config/local.js

```javascript
module.exports = {
  // 生产必填，开发默认 '/build/'
  publicPath: '//js.guanmai.cn/build/xxxx/',
  // 默认 8080
  port: 8080,
  // 默认不启用
  https: false,
  // 代理
  proxy: {
    '/core/*': {
      target: 'url',
      changeOrigin: true
    }
  }
}
```

/build 构建产物

## package.json

包含以下内容

- package
  - version
  - scripts
  - husky 
  - lint-staged
  - browserslist
  - 检查依赖
- .xxx
  - eslint
  - prettier
  - svgr
  - babel.config.js
  - gitignore
  - postcss 移除
- react-hot-loader 
  - app.js hot 
- template
  - index.html
    - meta
    - platform
    - fe_branch
    - git_commit
    - polyfill
    - fetch
 
# 大文件

moment

_lodash 不考虑优化，会影响 hash 不稳定_
