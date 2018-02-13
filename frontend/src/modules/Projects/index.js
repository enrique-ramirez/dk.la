import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

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

export default connect(mapStateToProps, mapDispatchToProps)(Projects)
