const { PATH } = require('../util')
const fs = require('fs-extra')

console.log('begin bootstrap')

require('./file')
require('./config')
require('./package')
require('./dot')
require('./template')

console.log('--> react hot')

const indexJs = fs.readFileSync(PATH.appIndexJs, { encoding: 'utf-8' })
if (!indexJs.includes('react-hot-loader/root')) {
  console.warn(
    '请设置好 /src/index.js 内引入 react-hot-loader，具体 https://github.com/gaearon/react-hot-loader',
  )
}

console.warn(
  'gm-react-app-scripts 会修改相应的文件，请通过git认真review再提交代码',
)
