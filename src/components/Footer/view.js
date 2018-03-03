import React from 'react'
import { FormattedHTMLMessage } from 'react-intl'

import matchProptype from 'types/match'

import styles from './styles.css'
import messages from './messages'

function Footer(props) {
  const { match } = props
  const isSplash = match.path === '/'

  return isSplash ? null : (
    <footer className={styles.footer}>
      <FormattedHTMLMessage
        values={{ year: (new Date()).getFullYear() }}
        {...messages.copyright}
      />
    </footer>
  )
}

Footer.propTypes = {
  match: matchProptype,
}

export default Footer
