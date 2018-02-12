import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { is } from 'immutable'
import { Helmet } from 'react-helmet'

import styles from './styles.css'
import messages from './messages'

// eslint-disable-next-line react/prefer-stateless-function
class Splash extends React.Component {
  componentWillMount() {
    const { loadSplash } = this.props

    loadSplash()
  }

  shouldComponentUpdate(nextProps) {
    const { props } = this

    return !is(nextProps.splash, props.splash)
  }

  render() {
    const {
      intl,
      splash,
    } = this.props

    return (
      <div>
        <Helmet>
          <title>{intl.formatMessage(messages.title)}</title>
        </Helmet>

        <div className={styles.wrapper}>
          {splash.get('loading')
          ? null
          : (
            <video autoPlay className={styles.video} loop>
              <source src={splash.getIn(['page', 'acf', 'featured_video_webm'])} type="video/webm" />
              <source src={splash.getIn(['page', 'acf', 'featured_video_mp4'])} type="video/mp4" />
            </video>
          )}
        </div>
      </div>
    )
  }
}

Splash.propTypes = {
  /** intl function */
  intl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  /** Function to request splash page. */
  loadSplash: PropTypes.func,
  /** Splash state */
  splash: ImmutablePropTypes.map, // eslint-disable-line react/no-typos
}

export default Splash
