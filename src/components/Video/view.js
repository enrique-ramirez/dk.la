import React from 'react'
import PropTypes from 'prop-types'

import parseVideoURL from 'utils/parseVideoURL'

import styles from './styles.css'

function Video(props) {
  const {
    title,
    url,
  } = props

  const videoData = parseVideoURL(url)

  return (
    <figure className={styles.wrapper}>
      <iframe
        allow="autoplay; encrypted-media"
        allowFullScreen
        frameBorder={0}
        src={videoData.src}
        title={title}
      />
    </figure>
  )
}

Video.propTypes = {
  /** Video title */
  title: PropTypes.string,
  /** Video URL */
  url: PropTypes.string.isRequired,
}

export default Video
