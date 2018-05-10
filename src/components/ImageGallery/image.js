import React from 'react'
import PropTypes from 'prop-types'

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

  shouldComponentUpdate(nextProps, nextState) {
    const { image } = this.props

    return nextProps.image.url !== image.url || nextState.loaded
  }

  handleLoad(event) {
    const img = event.target
    const isHorizontal = img.width > img.height

    // eslint-disable-next-line react/no-set-state
    this.setState({
      loaded: true, // eslint-disable-line react/no-unused-state
      horizontal: isHorizontal,
    })
  }

  render() {
    const { image } = this.props
    const { horizontal } = this.state

    return (
      <img
        alt={image.alt}
        className={horizontal ? styles.horizontal : ''}
        onLoad={this.handleLoad}
        src={image.url}
      />
    )
  }
}

Image.propTypes = {
  image: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

export default Image
