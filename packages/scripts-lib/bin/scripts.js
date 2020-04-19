#!/usr/bin/env node
const spawn = require('cross-spawn')

const script = process.argv[2]

if (['start', 'build', 'migrate', 'create-package'].includes(script)) {
  const result = spawn.sync(
    'node',
    [require.resolve('../scripts/' + script), process.argv.slice(3)].concat(
      process.argv.slice(3),
    ),
    { stdio: 'inherit' },
  )
  process.exit(result.status)
} else {
  console.log('Unknown script "' + script + '".')
}
