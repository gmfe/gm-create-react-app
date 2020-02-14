参考资料

# todo

ts

babel
- @babel/preset-typescript

# 命令行

chalk

辅助安装依赖 babel eslint prettier 

# webpack

官网性能优化建议
https://www.webpackjs.com/guides/build-performance/#%E5%B8%B8%E8%A7%84
https://github.com/gaearon/react-hot-loader
https://github.com/webpack-contrib/thread-loader
terser-webpack-plugin
momentjs local
plugins:[
   ...,
   new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
]
env
__DEBUG__
GIT_COMMIT GIT_BRANCH
webpack-dev-server --open
js chunkhash
css contenthash minicsextractplugin
file-loader hash
压缩
js 并行？
css optimizeCSSAssetsPlugin cssnano
tress-shaking  preset-env modules: false
scope hoisting product 默认开启
代码体积 scope hoisting
moment lodash
日志 stats
webpack-merge
config /local.json deploy.json
css less 分离

mainfest.json

react react-hot-reload
