import React from 'react'
import PropTypes from 'prop-types'

import Header from 'components/Header'

function Layout(props) {
  const {
    component: Component,
    route,
  } = props

  return (
    <div style={{ height: '100%', padding: '175px 50px 50px', boxSizing: 'border-box' }}>
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
