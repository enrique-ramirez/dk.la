import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

function getVimeoEmbedURL(url) {
  const regex = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i

  return `//player.vimeo.com/video/${url.match(regex)[1]}?autoplay=1`
}

function VimeoVideo(props) {
  const {
    title,
    url,
  } = props

  return (
    <div className={styles.wrapper}>
      <iframe
        allowFullScreen
        frameBorder={0}
        src={getVimeoEmbedURL(url)}
        title={title}
      />
    </div>
  )
}

VimeoVideo.propTypes = {
  /** Video title */
  title: PropTypes.string.isRequired,
  /** Video URL */
  url: PropTypes.string,
}

export default VimeoVideo
