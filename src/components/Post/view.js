import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import ContentWrap from 'components/ContentWrap'
import ImageGallery from 'components/ImageGallery'
import Spinner from 'components/Spinner'
import VideoGallery from 'components/VideoGallery'

import styles from './styles.css'
import messages from './messages'

function Post(props) {
  const {
    isLoading,
    post,
  } = props

  const images = get(post, 'acf.gallery', [])
  const videos = get(post, 'acf.videos', undefined)
  const stills = get(post, 'acf.photo_stills_post.post_name', '')
  const stillsURL = stills ? `/project/${stills}` : ''
  const content = {
    __html: get(post, 'content.rendered', ''),
  }
  const title = {
    __html: get(post, 'title.rendered', ''),
  }

  return isLoading ? <div className={styles.loading}><Spinner /></div> : (
    <section>
      {videos
        ? <VideoGallery videos={videos} />
        : null
      }

      <ContentWrap className={styles.wrapper} hasBack>
        <h1 className={styles.title} dangerouslySetInnerHTML={title} />
        <div className={styles.content} dangerouslySetInnerHTML={content} />
        {stillsURL
          ? (
            <div className={styles.stills}>
              <Link to={stillsURL}>
                <FormattedMessage {...messages.productionStills} />
              </Link>
            </div>
          )
          : null
        }
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
