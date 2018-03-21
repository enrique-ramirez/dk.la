import React from 'react'
import PropTypes from 'prop-types'

import Header from 'components/Header'
import Footer from 'components/Footer'

import styles from './styles.css'

function Layout(props) {
  const {
    component: Component,
    footerMenu,
    headerMenu,
    route,
  } = props

  return (
    <div className={styles.container}>
      <Header links={headerMenu.links} />
      <Component route={route} />
      <Footer links={footerMenu.links} />
    </div>
  )
}

Layout.propTypes = {
  component: PropTypes.func,
  footerMenu: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  headerMenu: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  route: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

export default Layout
