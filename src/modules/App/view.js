import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import {
  Route,
  Switch,
} from 'react-router-dom'

import Splash from 'modules/Splash'
import Projects from 'modules/Projects'
import ViewPost from 'modules/ViewPost'

import Layout from 'components/Layout'

import './styles.css'

// eslint-disable-next-line react/display-name
const layoutRender = (component, headerMenu) => route => (
  <Layout component={component} headerMenu={headerMenu.toJS()} route={route} />
)

// eslint-disable-next-line react/display-name
const render = headerMenu => route => (
  <TransitionGroup>
    <CSSTransition key={route.location.key} classNames="fade" timeout={2000}>
      <Switch location={route.location}>
        <Route
          path="/project/:slug"
          render={layoutRender(ViewPost, headerMenu)}
        />

        <Route
          path="/projects"
          render={layoutRender(Projects, headerMenu)}
        />

        <Route
          path="/"
          render={layoutRender(Splash, headerMenu)}
        />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
)

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component { // eslint-disable-line react/require-optimization
  componentDidMount() {
    const { loadHeaderMenu } = this.props
    loadHeaderMenu()
  }

  render() {
    const {
      headerMenu,
    } = this.props

    return (
      <Route render={render(headerMenu)} />
    )
  }
}

App.propTypes = {
  headerMenu: ImmutablePropTypes.map, // eslint-disable-line react/no-typos
  loadHeaderMenu: PropTypes.func,
}

export default App
