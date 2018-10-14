import React from 'react'
import PropTypes from 'prop-types'
import Masonry from 'react-masonry-component'
import Lightbox from 'react-image-lightbox'

import Image from './image'

const masonryOptions = {
  transitionDuration: 200,
}

class ImageGallery extends React.PureComponent {
  constructor(props) {
    super(props)

    this.registerMasonryRef = this.registerMasonryRef.bind(this)
    this.handleImageLoaded = this.handleImageLoaded.bind(this)
  }

  registerMasonryRef(node) {
    this.$masonry = node
    window.test = node
  }

  handleImageLoaded() {
    this.$masonry.performLayout()
  }

  render() {
    const {
      currentImage,
      handleImageClick,
      handleCloseModal,
      images,
      isModalOpen,
      handleImageChange,
    } = this.props

    const currentImageIndex = currentImage
      ? images.findIndex(image => image.id === currentImage)
      : undefined


    const previousImage = images[currentImageIndex - 1]
    const nextImage = images[currentImageIndex + 1]

    const _handleNextImage = () => handleImageChange(images[currentImageIndex + 1].ID)
    const _handlePreviousImage = () => handleImageChange(images[currentImageIndex - 1].ID)

    return (
      <React.Fragment>
        <Masonry
          ref={this.registerMasonryRef}
          options={masonryOptions}
          updateOnEachImageLoad
        >
          {images.map((image) => {
            const _handleImageClick = () => handleImageClick(image.id)
            return (
              <Image
                key={image.id}
                handleClick={_handleImageClick}
                image={image}
                onLoad={this.handleImageLoaded}
              />
            )
          })}
        </Masonry>

        {isModalOpen && (
          <Lightbox
            mainSrc={images[currentImageIndex].sizes.large}
            nextSrc={nextImage ? nextImage.sizes.large : undefined}
            onCloseRequest={handleCloseModal}
            onMoveNextRequest={_handleNextImage}
            onMovePrevRequest={_handlePreviousImage}
            prevSrc={previousImage ? previousImage.sizes.large : undefined}
          />
        )}
      </React.Fragment>
    )
  }
}

ImageGallery.propTypes = {
  /** Current Image */
  currentImage: PropTypes.number,
  /** Function to execute when modal close is called */
  handleCloseModal: PropTypes.func,
  /** Function to call when next image is requested */
  handleImageChange: PropTypes.func,
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
