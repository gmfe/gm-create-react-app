import React from 'react'
import Svgr from './svgr'
import StyleJsx from './style_jsx/index'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import CssModules from './css_modules'

const App = () => {
  return (
    <div>
      <Svgr />
      <StyleJsx />
      <CssModules />
      <div>
        <div>
          router
          <a href='#/demo'>to demo</a>
        </div>

        <div style={{ padding: '20px' }}>
          <Router>
            <Switch>
              <Route
                path='/demo'
                component={Loadable({
                  loader: () => import('./react_hot'),
                  loading: ({ isLoading }) => {
                    if (isLoading) {
                      return <div>loading</div>
                    } else {
                      return null
                    }
                  },
                })}
              />
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  )
}

export default App
