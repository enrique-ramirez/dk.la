import React from 'react'
import PropTypes from 'prop-types'
// import { FormattedMessage } from 'react-intl'
import { NavLink } from 'react-router-dom'

import matchProptype from 'types/match'

import styles from './styles.css'
// import messages from './messages'

import LogoWhite from './logo_white.svg'
import LogoBlack from './logo_black.svg'

function Header(props) {
  const {
    links,
    match,
  } = props
  const isSplash = match.path === '/'

  return (
    <header className={styles.header}>
      <NavLink to="/">
        {isSplash
          ? <LogoWhite />
          : <LogoBlack />
        }
      </NavLink>

      {isSplash
        ? null
        : (
          <ul>
            {links.map(link => (
              <li key={link.ID}>
                <NavLink to={link.url}>
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        )
      }
    </header>
  )
}

Header.propTypes = {
  links: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  match: matchProptype,
}


export default Header
