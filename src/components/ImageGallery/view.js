import React from 'react'
import PropTypes from 'prop-types'
import Masonry from 'react-masonry-component'

import Image from './image'

const masonryOptions = {
  transitionDuration: 0,
}

function ImageGallery(props) {
  const {
    handleImageClick,
    images,
  } = props

  return (
    <Masonry options={masonryOptions}>
      {images.map((image) => {
        const _handleImageClick = () => handleImageClick(image.id)
        return (
          <Image
            key={image.id}
            handleClick={_handleImageClick}
            image={image}
          />
        )
      })}
    </Masonry>
  )
}

ImageGallery.propTypes = {
  /** Function to execute when image is clicked */
  handleImageClick: PropTypes.func,
  /** Images to display */
  images: PropTypes.array, // eslint-disable-line react/forbid-prop-types
}

ImageGallery.defaultProps = {
  images: [],
}

export default ImageGallery
