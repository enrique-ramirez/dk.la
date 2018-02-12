import React from 'react'
// import PropTypes from 'prop-types'
// import { FormattedMessage } from 'react-intl'
// import { Link } from 'react-router-dom'

import matchProptype from 'types/match'

import styles from './styles.css'
// import messages from './messages'

import LogoWhite from './logo_white.svg'
import LogoBlack from './logo_black.svg'

function Header(props) {
  const { match } = props

  return (
    <header className={styles.header}>
      {match.path === '/'
        ? <LogoWhite />
        : <LogoBlack />
      }
    </header>
  )
}

Header.propTypes = {
  match: matchProptype,
}


export default Header
