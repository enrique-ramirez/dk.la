import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  loadPage,
  makeGetViewPage,
} from './duck'

import ViewPage from './view'

const mapStateToProps = createStructuredSelector({
  viewPage: makeGetViewPage(),
})

const mapDispatchToProps = {
  loadPage,
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPage)
