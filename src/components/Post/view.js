import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'

import ContentWrap from 'components/ContentWrap'
import ImageGallery from 'components/ImageGallery'
import Spinner from 'components/Spinner'
import VimeoVideo from 'components/VimeoVideo'

import styles from './styles.css'

function Post(props) {
  const {
    isLoading,
    post,
  } = props

  const images = get(post, 'acf.gallery', [])
  const video = get(post, 'acf.video_link', '')
  const content = {
    __html: get(post, 'content.rendered', ''),
  }
  const title = {
    __html: get(post, 'title.rendered', ''),
  }

  return isLoading ? <div className={styles.loading}><Spinner /></div> : (
    <section>
      {video
        ? <VimeoVideo title={post.slug} url={video} />
        : null
      }

      <ContentWrap className={styles.wrapper} hasBack>
        <h1 className={styles.title} dangerouslySetInnerHTML={title} />
        <div className={styles.content} dangerouslySetInnerHTML={content} />
      </ContentWrap>

      {images.length
        ? <ImageGallery images={images} />
        : null
      }

      <ContentWrap className={styles.wrapper} />
    </section>
  )
}

Post.propTypes = {
  /** Post is loading */
  isLoading: PropTypes.bool,
  /** Post data */
  post: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

export default Post
