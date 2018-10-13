import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import ContentWrap from 'components/ContentWrap'
import ImageGallery from 'components/ImageGallery'
import Spinner from 'components/Spinner'
import VideoGallery from 'components/VideoGallery'
import ScrollToTopOnMount from 'components/ScrollToTopOnMount'

import styles from './styles.css'
import messages from './messages'

function Post(props) {
  const {
    currentImage,
    currentVideo,
    handleChangeVideo,
    handleCloseModal,
    handleImageClick,
    isLoading,
    isModalOpen,
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
      <ScrollToTopOnMount />
      {videos
        ? (
          <VideoGallery
            currentVideo={currentVideo}
            handleChangeVideo={handleChangeVideo}
            videos={videos}
          />
        )
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
        ? (
          <ImageGallery
            currentImage={currentImage}
            handleCloseModal={handleCloseModal}
            handleImageClick={handleImageClick}
            images={images}
            isModalOpen={isModalOpen}
          />
        )
        : null
      }

      <ContentWrap className={styles.wrapper} />
    </section>
  )
}

Post.propTypes = {
  /** Current Image */
  currentImage: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  /** Current Video */
  currentVideo: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  /** Function to execute when clicking on video thumbnails */
  handleChangeVideo: PropTypes.func.isRequired,
  /** Function to execute when modal close is called */
  handleCloseModal: PropTypes.func,
  /** Function to execute when clicking on an image */
  handleImageClick: PropTypes.func.isRequired,
  /** Post is loading */
  isLoading: PropTypes.bool,
  /** Modal is open */
  isModalOpen: PropTypes.bool,
  /** Post data */
  post: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

export default Post
