import React from 'react'
import PropTypes from 'prop-types'
import { FormattedHTMLMessage } from 'react-intl'
import { NavLink } from 'react-router-dom'

import matchProptype from 'types/match'

import styles from './styles.css'
import messages from './messages'
import TwitterIcon from './twitter_icon.svg'
import FacebookIcon from './facebook_icon.svg'

function Footer(props) {
  const { links, match } = props
  const isSplash = match.path === '/'

  return isSplash ? null : (
    <footer className={styles.footer}>
      <ul className={styles.menu}>
        {links.map(link => (
          <li key={link.ID}>
            <NavLink to={link.url}>
              {link.url.includes('twitter')
                ? <TwitterIcon />
                : <FacebookIcon />
              }
            </NavLink>
          </li>
        ))}
      </ul>

      <FormattedHTMLMessage
        values={{ year: (new Date()).getFullYear() }}
        {...messages.copyright}
      />
    </footer>
  )
}

Footer.propTypes = {
  links: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  match: matchProptype,
}

export default Footer
