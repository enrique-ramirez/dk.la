import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { is } from 'immutable'
import { Helmet } from 'react-helmet'
import { Link, Redirect } from 'react-router-dom'

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

    this.handleScroll = this.handleScroll.bind(this)
    this.addEventListeners = this.addEventListeners.bind(this)
    this.removeEventListeners = this.removeEventListeners.bind(this)
  }

  componentDidMount() {
    const {
      loadSplash,
      splash,
    } = this.props

    if (splash.get('loading')) {
      loadSplash()
    }

    this.addEventListeners()
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { props, state } = this

    return !is(nextProps.splash, props.splash) || nextState.scrolled !== state.scrolled
  }

  componentWillUnmount() {
    this.removeEventListeners()
  }

  addEventListeners() {
    window.addEventListener('mousewheel', this.handleScroll)
    window.addEventListener('DOMMouseScroll', this.handleScroll)
    window.addEventListener('touchmove', this.handleScroll)
  }

  removeEventListeners() {
    window.removeEventListener('mousewheel', this.handleScroll)
    window.removeEventListener('DOMMouseScroll', this.handleScroll)
    window.removeEventListener('touchmove', this.handleScroll)
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

    console.log({ windowBottom, docHeight, state })

    if (windowBottom >= docHeight && !state.scrolled) {
      this.removeEventListeners()

      // eslint-disable-next-line react/no-set-state
      this.setState({
        scrolled: true,
      })
    }
  }

  render() {
    const { splash } = this.props
    const { scrolled } = this.state

    const projectsLink = '/projects'

    if (scrolled) {
      return <Redirect push to={projectsLink} />
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>{splash.getIn(['page', 'acf', 'seo_title'])}</title>
          <meta content={splash.getIn(['page', 'acf', 'seo_description'])} name="description" />
        </Helmet>

        <Link to={projectsLink}>
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
      </React.Fragment>
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
