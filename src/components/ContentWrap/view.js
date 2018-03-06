import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import messages from './messages'
import styles from './styles.css'

function ContentWrap(props) {
  const {
    className,
    children,
    hasBack,
    tagName: ComponentTag,
  } = props

  const classes = `${className} ${styles.wrapper}`

  return (
    <ComponentTag className={classes}>
      <div>
        {hasBack
          ? (
            <Link className={styles.backLink} to="/projects">
              <FormattedMessage {...messages.backLink} />
            </Link>
          )
          : null
        }
      </div>

      <div>
        {children}
      </div>
    </ComponentTag>
  )
}

ContentWrap.propTypes = {
  /** Children */
  children: PropTypes.node,
  /** Classes */
  className: PropTypes.string,
  /** Include back to projects link */
  hasBack: PropTypes.bool,
  /** Tag name to be used */
  tagName: PropTypes.string,
}

ContentWrap.defaultProps = {
  className: '',
  hasBack: false,
  tagName: 'div',
}

export default ContentWrap
