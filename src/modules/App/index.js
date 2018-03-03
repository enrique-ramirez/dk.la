import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'

import {
  getApp,
  loadHeaderMenu,
  makeGetHeaderMenu,
} from './duck'

import App from './view'

const mapStateToProps = createStructuredSelector({
  app: getApp,
  headerMenu: makeGetHeaderMenu(),
})

const mapDispatchToProps = {
  loadHeaderMenu,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
