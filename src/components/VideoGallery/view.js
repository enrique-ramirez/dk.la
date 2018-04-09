import React from 'react'
import PropTypes from 'prop-types'

import Video from 'components/Video'

function VideoGallery(props) {
  const { videos } = props

  return (
    <aside>
      <Video url={videos[0].video_link} />

      {videos.map(({ video_link: url }) => (
        <div key={url}>{url}</div>
      ))}
    </aside>
  )
}

VideoGallery.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.shape({
    video_link: PropTypes.string,
  })),
}

export default VideoGallery
