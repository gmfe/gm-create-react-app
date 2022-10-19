#!/usr/bin/env node
const spawn = require('cross-spawn')

const scripts = ['start', 'build', 'test', 'create-project']
const script = process.argv[2]

process.env.NODE_OPTIONS =
  (process.env.NODE_OPTIONS || '') + ` --max-old-space-size=8192`

if (scripts.includes(script)) {
  const result = spawn.sync(
    'node',
    [require.resolve('../scripts/' + script)].concat(process.argv.slice(3)),
    {
      stdio: 'inherit',
    },
  )
  process.exit(result.status)
} else {
  console.log('Unknown script "' + script + '".')
}
