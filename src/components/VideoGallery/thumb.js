import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

function Thumb(props) {
  const { handleClick, className, url } = props
  const classes = `${styles.thumbnail} ${className}`

  return (
    <li
      className={classes}
      onClick={handleClick}
      role="button"
    >
      <img alt="" src={url} />
    </li>
  )
}

Thumb.propTypes = {
  /** Classnames */
  className: PropTypes.string,
  /** Handle click function */
  handleClick: PropTypes.func,
  /** Video URL */
  url: PropTypes.string,
}

export default Thumb
