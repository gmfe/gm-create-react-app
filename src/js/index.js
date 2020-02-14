import React from 'react'
import ReactDOM from 'react-dom'
import SVGCopy from '../svg/copy.svg'
import A from './a'
import B from './b'

const App = () => {
  return (
    <div>
      <div>
        icon <SVGCopy />
      </div>
      <A />
      <B/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
