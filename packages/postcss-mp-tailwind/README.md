postcss-mp-tailwind 是一个为了在微信小程序中使用 [tailwindcss2](https://github.com/tailwindlabs/tailwindcss) 而编写的组件。

# 使用

`yarn add postcss-mp-tailwind`

在 postcss 插件中添加即可。

如果是 Taro，则添加配置 config/index.js

```javascript
const config = {
  postcss: {
    'postcss-mp-tailwind': {
      enable: true,
    },
  },
}
```

# 做了啥

目前很简单，具体见 src/index.js
