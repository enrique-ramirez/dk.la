import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import Spinner from 'components/Spinner'

import ProjectListItem from './ProjectListItem'
import styles from './styles.css'
import messages from './messages'

function ProjectsList(props) {
  const {
    posts,
    isLoading,
  } = props

  return (
    <section>
      {isLoading // eslint-disable-line no-nested-ternary
        ? (
          <div className={styles.loading}>
            <Spinner />
          </div>
        )
        : posts.length ? (
          <ol className={styles.posts}>
            {posts.map(post => <ProjectListItem key={post.id} post={post} />)}
          </ol>
        ) : (
          <div className={styles.empty}>
            <FormattedMessage {...messages.empty} />
          </div>
        )
      }
    </section>
  )
}

ProjectsList.propTypes = {
  /** Page is loading */
  isLoading: PropTypes.bool,
  /** Posts array */
  posts: PropTypes.array, // eslint-disable-line react/forbid-prop-types
}

export default ProjectsList
