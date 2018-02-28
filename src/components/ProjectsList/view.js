import React from 'react'
import PropTypes from 'prop-types'

import Spinner from 'components/Spinner'

import ProjectListItem from './ProjectListItem'
import styles from './styles.css'

function ProjectsList(props) {
  const {
    posts,
    isLoading,
  } = props

  return (
    <div>
      {isLoading
        ? (
          <div className={styles.loading}>
            <Spinner />
          </div>
        )
        : (
          <ol className={styles.posts}>
            {posts.map(post => <ProjectListItem key={post.id} post={post} />)}
          </ol>
        )
      }
    </div>
  )
}

ProjectsList.propTypes = {
  /** Page is loading */
  isLoading: PropTypes.bool,
  /** Posts array */
  posts: PropTypes.array, // eslint-disable-line react/forbid-prop-types
}

export default ProjectsList
