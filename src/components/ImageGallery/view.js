import React from 'react'
import PropTypes from 'prop-types'

import ContentWrap from 'components/ContentWrap'

import Image from './image'
import styles from './styles.css'

function ImageGallery(props) {
  const {
    images,
  } = props

  return (
    <section>
      {images.map(image => (
        <figure key={image.id} className={styles.image}>
          <Image image={image} />
          <ContentWrap tagName="figcaption">
            {image.title}
          </ContentWrap>
        </figure>
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
