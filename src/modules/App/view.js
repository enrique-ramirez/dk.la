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
const layoutRender = (component, headerMenu, footerMenu) => route => (
  <Layout
    component={component}
    footerMenu={footerMenu.toJS()}
    headerMenu={headerMenu.toJS()}
    route={route}
  />
)

// eslint-disable-next-line react/display-name
const render = (headerMenu, footerMenu) => route => (
  <TransitionGroup>
    <CSSTransition key={route.location.key} classNames="fade" timeout={2000}>
      <Switch location={route.location}>
        <Route
          path="/project/:slug"
          render={layoutRender(ViewPost, headerMenu, footerMenu)}
        />

        <Route
          path="/projects"
          render={layoutRender(Projects, headerMenu, footerMenu)}
        />

        <Route
          path="/category/:category"
          render={layoutRender(Projects, headerMenu, footerMenu)}
        />

        <Route
          path="/"
          render={layoutRender(Splash, headerMenu, footerMenu)}
        />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
)

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component { // eslint-disable-line react/require-optimization
  componentDidMount() {
    const { loadHeaderMenu, loadFooterMenu } = this.props

    loadHeaderMenu()
    loadFooterMenu()
  }

  render() {
    const {
      headerMenu,
      footerMenu,
    } = this.props

    return (
      <Route render={render(headerMenu, footerMenu)} />
    )
  }
}

App.propTypes = {
  footerMenu: ImmutablePropTypes.map, // eslint-disable-line react/no-typos
  headerMenu: ImmutablePropTypes.map, // eslint-disable-line react/no-typos
  loadFooterMenu: PropTypes.func,
  loadHeaderMenu: PropTypes.func,
}

export default App
