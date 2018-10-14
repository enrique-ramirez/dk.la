import React from 'react'
import PropTypes from 'prop-types'

import Spinner from 'components/Spinner'

import styles from './styles.css'

// eslint-disable-next-line react/prefer-stateless-function
class Image extends React.Component {
  constructor() {
    super()

    this.state = {
      loaded: false, // eslint-disable-line react/no-unused-state
      horizontal: undefined,
    }

    this.handleLoad = this.handleLoad.bind(this)
  }

  componentDidMount() {
    const { image } = this.props
    const preload = document.createElement('img')

    preload.onload = this.handleLoad

    preload.src = image.sizes.medium_large
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { image } = this.props

    return nextProps.image.url !== image.url || nextState.loaded
  }

  handleLoad(event) {
    const { onLoad } = this.props
    const img = event.target
    const isHorizontal = img.naturalWidth > img.naturalHeight

    // eslint-disable-next-line react/no-set-state
    this.setState({
      loaded: true, // eslint-disable-line react/no-unused-state
      horizontal: isHorizontal,
    })

    onLoad()
  }

  render() {
    const { handleClick, image } = this.props
    const { horizontal, loaded } = this.state

    let classes = styles.image

    classes = horizontal ? `${classes} ${styles.horizontal}` : classes

    return (
      <React.Fragment>
        <figure key={image.id} className={classes}>
          {loaded ?
            (
              <button onClick={handleClick} type="button">
                <img
                  alt={image.alt}
                  height={image.sizes['medium_large-height']}
                  src={image.sizes.medium_large}
                  width={image.sizes['medium_large-width']}
                />
              </button>
            )
            :
              (
                <span className={styles.preload}>
                  <Spinner size={20} />
                </span>
              )
          }
        </figure>
      </React.Fragment>
    )
  }
}

Image.propTypes = {
  handleClick: PropTypes.func,
  image: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onLoad: PropTypes.func,
}

export default Image
