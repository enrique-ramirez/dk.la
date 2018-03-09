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
  constructor() {
    super()

    this.state = {
      scrolled: false,
    }
  }

  componentDidMount() {
    const {
      loadSplash,
      splash,
    } = this.props

    if (splash.get('loading')) {
      loadSplash()
    }

    window.addEventListener('mousewheel', this.handleScroll)
    window.addEventListener('DOMMouseScroll', this.handleScroll)
  }

  shouldComponentUpdate(nextProps) {
    const { props } = this

    return !is(nextProps.splash, props.splash)
  }

  componentWillUnmount() {
    window.removeEventListener('mousewheel', this.handleScroll)
    window.removeEventListener('DOMMouseScroll', this.handleScroll)
  }

  handleScroll() {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight
    const {
      body,
      documentElement: html,
    } = document

    const { state } = this

    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    )
    const windowBottom = windowHeight + window.pageYOffset

    if (windowBottom >= docHeight && !state.scrolled) {
      // eslint-disable-next-line react/no-set-state
      this.setState({
        scrolled: true,
      })
    }
  }

  render() {
    const {
      splash,
    } = this.props

    return (
      <div>
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
