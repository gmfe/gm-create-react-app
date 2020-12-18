tailwind-gm-react-app 是一个为了在微信小程序中使用 [tailwindcss2](https://github.com/tailwindlabs/tailwindcss) 而编写的组件。参考 [taro-tailwind](https://github.com/windedge/taro-tailwind)

# 使用

`yarn add @gm-react-app/tailwind-gm-react-app`

在 tailwind.config.js 中添加插件

```javascript
module.exports = {
  presets: [require('@gm-react-app/tailwind-gm-react-app')],
  // ...
}
```

# 做了啥

由于微信小程序的样式

- 类名不允许出现字符 `. : /`。比如不支持 `.tw-w-1.5` `.tw-w-1/4` `.hover:tw-w-1`
- 不支持 ` :not`，(注意 :not 前面有空格。xxx:not 是支持的，微信的伪类需要再元素上使用)
- 仅支持部分选择器。 比如 `*`

对此做了调整

- 调整 [spearator](https://tailwindcss.com/docs/configuration#separator) 为 `_`。如 `.hover:tw-w-1` => `.hover_tw-w-1`
- `. /`替换为`d f`。如 `.tw-w-1.5` => `.tw-w-1d5`，`.tw-w-1/4` => `.tw-w-1f4`
- 禁用 `space divideXXX`。因为他们使用了 ` :not`
- 禁用 preflight。小程序不支持 modern-normalize
- 额外禁用 screens。移动端不需要考虑屏幕适配

同时还做了其他调整

- 增加前缀 `tw-`
- 增加 `!important`
- rem 换算成 px

至于选择器部分，引入 postcss 插件过滤，具体见 `postcss-mp-tailwind`
