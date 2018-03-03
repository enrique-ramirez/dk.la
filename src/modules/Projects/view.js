import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { is } from 'immutable'
import { Helmet } from 'react-helmet'
import InfiniteScroll from 'react-infinite-scroller'

import ProjectsList from 'components/ProjectsList'
import Spinner from 'components/Spinner'

// eslint-disable-next-line react/prefer-stateless-function
class Projects extends React.Component {
  componentWillMount() {
    const {
      loadPosts,
      projects,
    } = this.props

    if (projects.get('loading')) {
      loadPosts()
    }
  }

  shouldComponentUpdate(nextProps) {
    const { props } = this

    return !is(nextProps.projects, props.projects)
  }

  render() {
    const {
      loadPosts,
      projects,
    } = this.props

    return (
      <section>
        <Helmet>
          <title>{projects.getIn(['page', 'acf', 'seo_title'])}</title>
          <meta content={projects.getIn(['page', 'acf', 'seo_description'])} name="description" />
        </Helmet>

        <InfiniteScroll
          hasMore={projects.getIn(['pagination', 'totalPages']) > projects.getIn(['pagination', 'page'])}
          loader={<Spinner key={0} />}
          loadMore={loadPosts}
          pageStart={1}
          threshold={50}
        >
          <ProjectsList
            isLoading={projects.get('loading')}
            posts={projects.get('posts').toJS()}
          />
        </InfiniteScroll>
      </section>
    )
  }
}

Projects.propTypes = {
  /** Function to request projects page. */
  loadPosts: PropTypes.func,
  /** Projects state */
  projects: ImmutablePropTypes.map, // eslint-disable-line react/no-typos
}

export default Projects
