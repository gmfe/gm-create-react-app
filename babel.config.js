module.exports = api => {
  api.cache(true)
  return {
    // TODO why 忽略 @babel/runtime
    // ignore: [/@babel[/\\]runtime/],
    presets: ['gm-react-app']
  }
}
