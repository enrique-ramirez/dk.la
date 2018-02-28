import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

function Spinner(props) {
  const {
    size,
  } = props

  const style = {
    height: `${size}px`,
    width: `${size}px`,
  }

  return (
    <div className={styles.spinner} style={style}>
      <div className={styles.cube1} />
      <div className={styles.cube2} />
      <div className={styles.cube3} />
      <div className={styles.cube4} />
    </div>
  )
}

Spinner.propTypes = {
  /** Size of the spinner */
  size: PropTypes.number,
}

Spinner.defaultProps = {
  size: 40,
}

export default Spinner
