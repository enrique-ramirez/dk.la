import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  changeVideo,
  closeModal,
  imageClick,
  loadPost,
  makeGetViewPost,
  imageChange,
} from './duck'

import ViewPost from './view'

const mapStateToProps = createStructuredSelector({
  viewPost: makeGetViewPost(),
})

const mapDispatchToProps = {
  changeVideo,
  closeModal,
  imageClick,
  loadPost,
  imageChange,
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost)
