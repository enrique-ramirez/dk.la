import React from 'react'
import PropTypes from 'prop-types'

import Video from 'components/Video'
import videoType from 'types/video'

import Thumb from './thumb'
import styles from './styles.css'

function VideoGallery(props) {
  const {
    currentVideo,
    handleChangeVideo,
    videos,
  } = props

  return (
    <aside>
      <Video url={currentVideo.src} />

      {videos.length > 1
        ? (
          <ul className={styles.thumbnails}>
            {videos.map(({ id, thumbnail }) => {
              const _handleClick = () => handleChangeVideo(id)
              const className = id === currentVideo.id ? styles.current : ''

              return (
                <Thumb
                  key={thumbnail}
                  className={className}
                  handleClick={_handleClick}
                  url={thumbnail}
                />
              )
            })}
          </ul>
        )
        : null
      }
    </aside>
  )
}

VideoGallery.propTypes = {
  /** Current video displayed on big screen */
  currentVideo: videoType,
  /** Function to execute when clicking on video thumbnails */
  handleChangeVideo: PropTypes.func.isRequired,
  /** Videos array */
  videos: PropTypes.arrayOf(videoType),
}

export default VideoGallery
