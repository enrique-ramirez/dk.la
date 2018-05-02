import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

function Thumb(props) {
  const { handleClick, url } = props

  return (
    <li
      className={styles.thumbnail}
      onClick={handleClick}
      role="button"
    >
      <img alt="" src={url} />
    </li>
  )
}

Thumb.propTypes = {
  /** Handle click function */
  handleClick: PropTypes.func,
  /** Video URL */
  url: PropTypes.string,
}

export default Thumb
