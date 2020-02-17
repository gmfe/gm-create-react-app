const { PATH } = require('../util')
const fs = require('fs')

console.log('--> template')

if (fs.existsSync(PATH.appIndexTemplate)) {
  const template = fs.readFileSync(PATH.appIndexTemplate, { encoding: 'utf-8' })

  const list = [
    '<meta charset="UTF-8" />',
    '<meta name="format-detection" content="telephone=no" />',
    '<meta name="renderer" content="webkit" />',
    '__platform',
    '____fe_branch',
    '____git_commit',
    '//js.guanmai.cn/build/libs/babel-polyfill/7.4.4/dist/polyfill.min.js',
    '//js.guanmai.cn/build/libs/gm-fetch/2.0.1/gm-fetch.min.js'
  ]

  list.forEach(value => {
    if (!template.includes(value)) {
      console.error('请提供 ', value)
    }
  })
} else {
  console.error('请提供 /src/index.html')
}

// 移除之前的
fs.rmdirSync(PATH.appDirectory + '/template')
