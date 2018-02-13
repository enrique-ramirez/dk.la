import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { is } from 'immutable'
import { Helmet } from 'react-helmet'

// import styles from './styles.css'

// eslint-disable-next-line react/prefer-stateless-function
class Projects extends React.Component {
  componentWillMount() {
    const { loadPosts } = this.props

    loadPosts()
  }

  shouldComponentUpdate(nextProps) {
    const { props } = this

    return !is(nextProps.projects, props.projects)
  }

  render() {
    const {
      projects,
    } = this.props

    return (
      <section>
        <Helmet>
          <title>{projects.getIn(['page', 'acf', 'seo_title'])}</title>
          <meta content={projects.getIn(['page', 'acf', 'seo_description'])} name="description" />
        </Helmet>

        <ul>
          {projects.get('posts').map(post => (
            <li key={post.get('id')}>
              {post.getIn(['title', 'rendered'])}
            </li>
          ))}
        </ul>
      </section>
    )
  }
}

Projects.propTypes = {
  /** Function to request splash page. */
  loadPosts: PropTypes.func,
  /** Projects state */
  projects: ImmutablePropTypes.map, // eslint-disable-line react/no-typos
}

export default Projects
