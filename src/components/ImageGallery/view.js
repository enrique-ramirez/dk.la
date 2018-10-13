import React from 'react'
import PropTypes from 'prop-types'
import Masonry from 'react-masonry-component'
import Lightbox from 'react-image-lightbox'

import Image from './image'

const masonryOptions = {
  transitionDuration: 0,
}

function ImageGallery(props) {
  const {
    currentImage,
    handleImageClick,
    handleCloseModal,
    images,
    isModalOpen,
  } = props

  return (
    <React.Fragment>
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

      {isModalOpen && (
        <Lightbox
          mainSrc={currentImage.sizes.large}
          onCloseRequest={handleCloseModal}
        />
      )}
    </React.Fragment>
  )
}

ImageGallery.propTypes = {
  /** Current Image */
  currentImage: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  /** Function to execute when modal close is called */
  handleCloseModal: PropTypes.func,
  /** Function to execute when image is clicked */
  handleImageClick: PropTypes.func,
  /** Images to display */
  images: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  /** Modal is open */
  isModalOpen: PropTypes.bool,
}

ImageGallery.defaultProps = {
  images: [],
}

export default ImageGallery
