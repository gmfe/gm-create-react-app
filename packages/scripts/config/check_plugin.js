class CheckPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('GMCheckPlugin', (compilation) => {
      for (const chunk of compilation.chunks) {
        for (const file of chunk.files) {
          const asset = compilation.getAsset(file)
          if (file.endsWith('.js')) {
            if (asset.source._value) {
              if (asset.source._value.includes('const ')) {
                throw new Error('has const ')
              }
            }
          }
        }
      }
    })
  }
}

module.exports = CheckPlugin
