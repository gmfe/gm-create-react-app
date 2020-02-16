module.exports = {
  port: 8081,
  proxy: {
    "/station/*": {
      "target": "http://station.guanmai.cn",
      "changeOrigin": true
    }
  }
}
