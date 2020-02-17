import React from 'react'

const Input = () => {
  const [value, setValue] = React.useState('')
  return (
    <input type='text' value={value} onChange={e => setValue(e.target.value)} />
  )
}

const A = () => {
  return <div>a</div>
}

const ReactHot = () => {
  return (
    <div>
      react hot
      <div>
        <Input />
        <A />
      </div>
    </div>
  )
}

export default ReactHot
