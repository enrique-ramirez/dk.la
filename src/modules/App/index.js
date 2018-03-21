import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'

import {
  getApp,
  loadHeaderMenu,
  loadFooterMenu,
  makeGetHeaderMenu,
  makeGetFooterMenu,
} from './duck'

import App from './view'

const mapStateToProps = createStructuredSelector({
  app: getApp,
  headerMenu: makeGetHeaderMenu(),
  footerMenu: makeGetFooterMenu(),
})

const mapDispatchToProps = {
  loadHeaderMenu,
  loadFooterMenu,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
