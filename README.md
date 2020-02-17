gm-react-app

# 使用

安装

```shell script
yarn add @gm-react-app/scripts
```

配置自动

```shell script
gm-react-app-scripts check
```

配置手动
见。。。

# feature

svg [svgr](https://github.com/gregberge/svgr) 只局限在 /src/svg 下，避免和其他 svg 冲突

less

style-jsx

template ejs 语法

react-hot-loader


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

