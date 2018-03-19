import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

function parseVideo(url) {
  let type
  let src

  url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/)

  if (RegExp.$3.indexOf('youtu') > -1) {
    type = 'youtube'
    src = `//www.youtube.com/embed/${RegExp.$6}?rel=0&amp;showinfo=0&amp;autoplay=1`
  } else if (RegExp.$3.indexOf('vimeo') > -1) {
    type = 'vimeo'
    src = `//player.vimeo.com/video/${RegExp.$6}?autoplay=1`
  }

  return {
    id: RegExp.$6,
    type,
    src,
  }
}

function Video(props) {
  const {
    title,
    url,
  } = props

  const videoData = parseVideo(url)

  return (
    <div className={styles.wrapper}>
      <iframe
        allow="autoplay; encrypted-media"
        allowFullScreen
        frameBorder={0}
        src={videoData.src}
        title={title}
      />
    </div>
  )
}

Video.propTypes = {
  /** Video title */
  title: PropTypes.string.isRequired,
  /** Video URL */
  url: PropTypes.string,
}

export default Video
