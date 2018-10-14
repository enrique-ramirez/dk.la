import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

class FullScreenVideo extends React.PureComponent {
  constructor(props) {
    super(props)

    this.registerVideoRef = this.registerVideoRef.bind(this)
  }

  componentDidMount() {
    this.$video.play()
  }

  registerVideoRef(node) {
    this.$video = node
  }

  render() {
    const {
      mp4URL,
      webmURL,
    } = this.props

    return (
      <figure className={styles.wrapper}>
        <video ref={this.registerVideoRef} autoPlay className={styles.video} loop playsInline>
          <source src={webmURL} type="video/webm" />
          <source src={mp4URL} type="video/mp4" />
        </video>
      </figure>
    )
  }
}

FullScreenVideo.propTypes = {
  mp4URL: PropTypes.string.isRequired,
  webmURL: PropTypes.string.isRequired,
}


export default FullScreenVideo
