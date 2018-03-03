import React from 'react'
import PropTypes from 'prop-types'

import Header from 'components/Header'
import Footer from 'components/Footer'

import styles from './styles.css'

function Layout(props) {
  const {
    component: Component,
    headerMenu,
    route,
  } = props

  return (
    <div className={styles.container}>
      <Header links={headerMenu.links} />
      <Component route={route} />
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  component: PropTypes.func,
  headerMenu: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  route: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

export default Layout
