import React from 'react'

import {
  Route,
  Switch,
} from 'react-router-dom'

import Splash from 'modules/Splash'
import Projects from 'modules/Projects'

import Layout from 'components/Layout'

import './styles.css'

const layoutRender = component => route => <Layout component={component} route={route} /> // eslint-disable-line react/display-name

function App() {
  return (
    <div style={{ height: '100%' }}>
      <Switch>
        <Route
          path="/projects"
          render={layoutRender(Projects)}
        />
        <Route
          path="/"
          render={layoutRender(Splash)}
        />
      </Switch>
    </div>
  )
}

export default App
