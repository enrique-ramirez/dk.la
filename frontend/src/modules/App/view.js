import React from 'react'

import {
  Route,
} from 'react-router-dom'

import Splash from 'modules/Splash'

import Header from 'components/Header'

import './styles.css'

function App() {
  return (
    <div>
      <Header />
      <Route component={Splash} path="/" />
    </div>
  )
}

export default App
