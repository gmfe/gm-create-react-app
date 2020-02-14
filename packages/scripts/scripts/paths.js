const fs = require('fs')
const appDirectory = fs.realpathSync(process.cwd())

console.log(appDirectory)
