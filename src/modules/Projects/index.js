import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom'

import {
  loadPosts,
  makeGetProjects,
} from './duck'

import Projects from './view'

const mapStateToProps = createStructuredSelector({
  projects: makeGetProjects(),
})

const mapDispatchToProps = {
  loadPosts,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Projects))
