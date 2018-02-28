import React from 'react'
import PropTypes from 'prop-types'

import Header from 'components/Header'

import styles from './styles.css'

function Layout(props) {
  const {
    component: Component,
    route,
  } = props

  return (
    <div className={styles.container}>
      <Header />
      <Component route={route} />
    </div>
  )
}

Layout.propTypes = {
  component: PropTypes.func,
  route: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

export default Layout
