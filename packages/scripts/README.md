# 使用

安装

```shell script
yarn add @gm-react-app/scripts
```

## 迁移指引

```shell script
gras migrate
```

之后跟着指引做就对了

## 模板

```shell script
gras create-project xxx
```

# 说明

## 文件夹

```
my-project
  build/
  config/
    deploy.js
    local.js
    webpack.config.js
  src/
    index.js
    index.html
    svg/
      xxx.svg
  .eslintrc.js
  .gitignore
  .prettierrc.js
  .stylelintrc
  babel.config.js
  package.json
  yarn.lock
```

/build 构建产物

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
  proxy: [
    {
      context: ['/xxxx', '/xxx'],
      target: 'url',
      changeOrigin: true,
    },
  ],
  autoRouterReg: '/^\\.\\/customer.*?index\\.page\\./',
}
```

/config/webpack.config.js 如果修改 webpack 配置，提供此文件

入口 /src/index.js

模板 /src/index.html，支持 ejs 语法

svg [svgr](https://github.com/gregberge/svgr) 只局限在 /svg 下，避免和其他 svg 冲突

## babel

默认值解析 src/目录下和 node_modules/下的 gm-、@gmfe、@gm-touch，其他请联系作者 or 自行补充

## css

less

style-jsx

## 其他

react-hot-loader

默认做了 alias

```
    alias: {
      // yarn link 后保持 react 一致
      react: path.resolve('react'),
      common: PATH.appDirectory + 'src/js/common/',
      stores: PATH.appDirectory + 'src/js/stores/',
      svg: PATH.appDirectory + 'src/svg/',
      img: PATH.appDirectory + 'src/img/'
    }
```

环境

```
process.env.NODE_ENV development test production
process.env.GIT_BRANCH
process.env.GIT_COMMIT
```

变量

```
__DEBUG__
__DEVELOPMENT__
__TEST__
__PRODUCTION__
__VERSION__ 来自 package.json version
__NAME__ 来自 package.json aliasName
__CLIENT_NAME__ 来自 package.json clientName
__BRANCH__
__COMMIT__
__AUTO_ROUTER_REG__ 方便开发，设置此，使build的文件更少，开发更快。默认 /index\.page\./
```

模板变量

```
htmlWebpackPlugin.options.branch
htmlWebpackPlugin.options.commit
htmlWebpackPlugin.options.env
```
