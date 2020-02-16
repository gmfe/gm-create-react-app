#!/usr/bin/env node
const spawn = require('cross-spawn')

const script = process.argv[2]

if (['start', 'build', 'test'].includes(script)) {
  const result = spawn.sync('node', [require.resolve('../scripts/' + script)], {
    stdio: 'inherit'
  })
  process.exit(result.status)
} else {
  console.log('Unknown script "' + script + '".')
}
