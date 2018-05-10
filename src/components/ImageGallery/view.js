import React from 'react'
import PropTypes from 'prop-types'

import Image from './image'

function ImageGallery(props) {
  const {
    images,
  } = props

  return (
    <section>
      {images.map(image => (
        <Image key={image.id} image={image} />
      ))}
    </section>
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
