import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

function FullScreenVideo(props) {
  const {
    mp4URL,
    webmURL,
  } = props

  return (
    <figure className={styles.wrapper}>
      <video autoPlay className={styles.video} loop playsInline>
        <source src={webmURL} type="video/webm" />
        <source src={mp4URL} type="video/mp4" />
      </video>
    </figure>
  )
}

FullScreenVideo.propTypes = {
  mp4URL: PropTypes.string.isRequired,
  webmURL: PropTypes.string.isRequired,
}


export default FullScreenVideo
