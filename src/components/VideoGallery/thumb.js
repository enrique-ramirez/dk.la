import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

function Thumb(props) {
  const { url } = props

  return (
    <li className={styles.thumbnail}>
      <img alt="" src={url} />
    </li>
  )
}

Thumb.propTypes = {
  url: PropTypes.string,
}

export default Thumb
