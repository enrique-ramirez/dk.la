import React from 'react'
import PropTypes from 'prop-types'

import Video from 'components/Video'

import Thumb from './thumb'
import styles from './styles.css'

function VideoGallery(props) {
  const { videos } = props

  return (
    <aside>
      <Video url={videos[0].src} />

      {videos.length > 1
        ? (
          <ul className={styles.thumbnails}>
            {videos.map(({ thumbnail }) => <Thumb key={thumbnail} url={thumbnail} />)}
          </ul>
        )
        : null
      }
    </aside>
  )
}

VideoGallery.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.shape({
    video_link: PropTypes.string,
  })),
}

export default VideoGallery
