import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  changeVideo,
  loadPost,
  makeGetViewPost,
} from './duck'

import ViewPost from './view'

const mapStateToProps = createStructuredSelector({
  viewPost: makeGetViewPost(),
})

const mapDispatchToProps = {
  changeVideo,
  loadPost,
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost)
