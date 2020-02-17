import { hot } from 'react-hot-loader/root'
import './index.less'
import ReactDOM from 'react-dom'
import React from 'react'
import App from './js/app'

const Root = hot(App)

ReactDOM.render(<Root />, document.getElementById('appContainer'))
