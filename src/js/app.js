import { hot } from 'react-hot-loader/root'
import React from 'react'
import SVGCopy from '../svg/copy.svg'
import A from './a'
import B from './b/index'

const App = () => {
  return (
    <div>
      <div>
        icon <SVGCopy />
      </div>
      <A />
      <B />
    </div>
  )
}

export default hot(App)
