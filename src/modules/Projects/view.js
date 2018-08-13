import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { is } from 'immutable'
import { Helmet } from 'react-helmet'
import InfiniteScroll from 'react-infinite-scroller'

import ProjectsList from 'components/ProjectsList'
import Spinner from 'components/Spinner'
import matchProptype from 'types/match'

// eslint-disable-next-line react/prefer-stateless-function
class Projects extends React.Component {
  constructor() {
    super()

    this.getNextPage = this.getNextPage.bind(this)
  }

  componentWillMount() {
    const {
      loadPosts,
      projects,
    } = this.props

    if (projects.get('loading')) {
      loadPosts({})
    }
  }

  shouldComponentUpdate(nextProps) {
    const { props } = this

    return !is(nextProps.projects, props.projects)
  }

  getNextPage(page) {
    const { loadPosts, match } = this.props
    const options = { page }

    if (match.params.category) {
      options.category = match.params.category
    }

    loadPosts(options)
  }

  render() {
    const { getNextPage } = this
    const { projects } = this.props

    return (
      <section>
        <Helmet>
          <title>{projects.getIn(['page', 'acf', 'seo_title'])}</title>
          <meta content={projects.getIn(['page', 'acf', 'seo_description'])} name="description" />
        </Helmet>

        <InfiniteScroll
          hasMore={projects.getIn(['pagination', 'totalPages']) > projects.getIn(['pagination', 'page'])}
          loader={<Spinner key={0} />}
          loadMore={getNextPage}
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
  /** react router match */
  match: matchProptype,
  /** Projects state */
  projects: ImmutablePropTypes.map, // eslint-disable-line react/no-typos
}

export default Projects
