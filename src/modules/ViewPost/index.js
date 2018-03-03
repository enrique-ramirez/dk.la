import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  loadPost,
  makeGetViewPost,
} from './duck'

import ViewPost from './view'

const mapStateToProps = createStructuredSelector({
  viewPost: makeGetViewPost(),
})

const mapDispatchToProps = {
  loadPost,
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost)
