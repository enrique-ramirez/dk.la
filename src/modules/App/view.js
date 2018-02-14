import React from 'react'

import {
  Route,
} from 'react-router-dom'

import Splash from 'modules/Splash'
import Projects from 'modules/Projects'

import Header from 'components/Header'

import './styles.css'

function App() {
  return (
    <div>
      <Header />
      <Route component={Projects} path="/projects" />
      <Route component={Splash} exact path="/" />
    </div>
  )
}

export default App
