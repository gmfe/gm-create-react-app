# 关于项目

一些处理前端工程事项的包

# 使用说明

`yarn add @gm-react-app/scripts`

如果有用到tailwind，执行`yarn add @gm-react-app/tailwind-gm-react-app`

## 发版

当开发分支的代码合并到master后，在本地拉最新master代码

执行`yarn run publish-latest` 进行发版（这个发的是最新版，如果觉得版本不稳定可以先执行`yarn run publish-beta` 发个测试版）

版本号定义`x.y.z` x是新版本，y是新功能，z是修bug

在发版的过程中如果报错说你要登录npm，那就先执行`yrm use npm`切换到npm源

执行`npm login`登录npm（登录的账号密码可以咨询其他同事）

登录了以后切换到淘宝源，执行`yrm use taobao`

再执行`yarn run publish-latest`进行发版

发版成功以后等几分钟后生效

在有用到该的项目中进行依赖版本升级


# 主要模块

- commitlint-gm-react-app：定义了commitlint的规则

- eslint-plugin-gm-react-app：定义了eslint的规则

- tailwind-gm-react-app：定义了公司内部使用tailwind的一些配置

- postcss-mp-tailwind：移动端使用tailwind的一些配置

- script：定义了webpack规则，集成了除tailwind-gm-react-app以外的所有包

- ts-config-gm-react-app：定义了ts规则
