import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  changeVideo,
  imageClick,
  loadPost,
  makeGetViewPost,
} from './duck'

import ViewPost from './view'

const mapStateToProps = createStructuredSelector({
  viewPost: makeGetViewPost(),
})

const mapDispatchToProps = {
  changeVideo,
  imageClick,
  loadPost,
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost)
