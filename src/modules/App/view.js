import React from 'react'
import PropTypes from 'prop-types'

import {
  Route,
  Switch,
} from 'react-router-dom'

import Splash from 'modules/Splash'
import Projects from 'modules/Projects'
// import Post from 'modules/Post'

import Layout from 'components/Layout'

import './styles.css'

const layoutRender = component => route => <Layout component={component} route={route} /> // eslint-disable-line react/display-name

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component { // eslint-disable-line react/require-optimization
  componentDidMount() {
    const { loadHeaderMenu } = this.props
    loadHeaderMenu()
  }

  render() {
    return (
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
    )
  }
}

App.propTypes = {
  loadHeaderMenu: PropTypes.func,
}

export default App
