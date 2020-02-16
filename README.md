gm-react-app

# 使用

安装

```shell script
yarn install @gm-react-app/scripts
```

配置自动

```shell script
yarn run check
```

配置手动

# feature

**入口**

/src/index.js

- svg 要在 /svg/xxx.svg 下
- less
- style-jsx
- [ ] iconfont
- [ ] react-hot-loader
- [ ] 自定义配置 webpack
- [ ] env

babel polyfill

react-hot-loader

browserslist

**环境**

process.env.NODE_ENV development test production

process.env.GIT_BRANCH

process.env.GIT_COMMIT

**变量**

`__DEBUG__`
`__DEVELOPMENT__`
`__TEST__`
`__PRODUCTION__`
`__VERSION__` 来自 package.json version

# 详细配置

## react-hot-loader

see https://github.com/gaearon/react-hot-loader

额外只需在

## deploy.js localjs

path
config/deploy.js
config/local.js

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


```json
{
  "browserslist": {
    "production": ["iOS >= 8", "Android >= 5.0"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```
