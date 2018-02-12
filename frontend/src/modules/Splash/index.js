import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  loadSplash,
  makeGetSplash,
} from './duck'

import Splash from './view'

const mapStateToProps = createStructuredSelector({
  splash: makeGetSplash(),
})

const mapDispatchToProps = {
  loadSplash,
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Splash))
