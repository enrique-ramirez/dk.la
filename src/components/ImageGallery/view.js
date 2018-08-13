import React from 'react'
import PropTypes from 'prop-types'
import Masonry from 'react-masonry-component'

import Image from './image'

const masonryOptions = {
  transitionDuration: 0,
}

function ImageGallery(props) {
  const {
    images,
  } = props

  return (
    <Masonry options={masonryOptions}>
      {images.map(image => (
        <Image key={image.id} image={image} />
      ))}
    </Masonry>
  )
}

ImageGallery.propTypes = {
  /** Images to display */
  images: PropTypes.array, // eslint-disable-line react/forbid-prop-types
}

ImageGallery.defaultProps = {
  images: [],
}

export default ImageGallery
