import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { is } from 'immutable'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import FullScreenVideo from 'components/FullScreenVideo'

import ScrollArrow from './scroll_arrow.svg'
import styles from './styles.css'

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
      splash,
    } = this.props

    return (
      <div className={styles.wrapper}>
        <Helmet>
          <title>{splash.getIn(['page', 'acf', 'seo_title'])}</title>
          <meta content={splash.getIn(['page', 'acf', 'seo_description'])} name="description" />
        </Helmet>

        <Link to="/projects">
          <ScrollArrow className={styles.scroll} />
        </Link>

        {splash.get('loading')
        ? null
        : (
          <FullScreenVideo
            mp4URL={splash.getIn(['page', 'acf', 'featured_video_mp4'])}
            webmURL={splash.getIn(['page', 'acf', 'featured_video_webm'])}
          />
        )}
      </div>
    )
  }
}

Splash.propTypes = {
  /** Function to request splash page. */
  loadSplash: PropTypes.func,
  /** Splash state */
  splash: ImmutablePropTypes.map, // eslint-disable-line react/no-typos
}

export default Splash
