import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'

import ContentWrap from 'components/ContentWrap'
import Spinner from 'components/Spinner'
import ScrollToTopOnMount from 'components/ScrollToTopOnMount'

import styles from './styles.css'

function Page(props) {
  const {
    isLoading,
    page,
  } = props

  const content = {
    __html: get(page, 'content.rendered', ''),
  }
  const title = {
    __html: get(page, 'title.rendered', ''),
  }

  return isLoading ? <div className={styles.loading}><Spinner /></div> : (
    <section>
      <ScrollToTopOnMount />

      <ContentWrap className={styles.wrapper}>
        <h1 className={styles.title} dangerouslySetInnerHTML={title} />
        <div className={styles.content} dangerouslySetInnerHTML={content} />
      </ContentWrap>
    </section>
  )
}

Page.propTypes = {
  /** Page is loading */
  isLoading: PropTypes.bool,
  /** Page data */
  page: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

export default Page
