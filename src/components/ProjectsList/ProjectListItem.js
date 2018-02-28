import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styles from './styles.css'

class ProjectListItem extends React.PureComponent {
  constructor(props) {
    super(props)

    this.registerVideoRef = this.registerVideoRef.bind(this)
    this.handlePlayVideo = this.handlePlayVideo.bind(this)
    this.handlePauseVideo = this.handlePauseVideo.bind(this)
  }

  getThumbnail() {
    const {
      post,
    } = this.props
    const media = post.featured_media
    let thumbnail = null

    if (!media || !media.media_details || !media.media_details.sizes) {
      return thumbnail
    }

    const { sizes } = media.media_details

    if (sizes['grid-thumb']) {
      thumbnail = sizes['grid-thumb'].source_url
    } else if (sizes.thumbnail) {
      thumbnail = sizes.thumbnail.source_url
    } else {
      thumbnail = media.source_url
    }

    return thumbnail
  }

  handlePlayVideo() {
    this.$video.play()
  }

  handlePauseVideo() {
    this.$video.pause()
  }

  registerVideoRef(node) {
    this.$video = node
  }

  // eslint-disable-next-line class-methods-use-this
  renderHTML(rawHTML) {
    return React.createElement('span', { dangerouslySetInnerHTML: { __html: rawHTML } })
  }

  render() {
    const { post } = this.props
    const url = `/projects/view/${post.slug}`
    const {
      thumbnail_webm: webm,
      thumbnail_mp4: mp4,
    } = post.acf

    return (
      <li
        className={styles.post}
        onMouseEnter={this.handlePlayVideo}
        onMouseLeave={this.handlePauseVideo}
      >
        <Link to={url}>
          <span className={styles.meta}>
            {this.renderHTML(post.title.rendered)}
            <small>
              {post.categories.map((category) => {
                const text = `/${category.name}`
                return <span key={category.id}>{text}</span>
              })}
            </small>
          </span>

          {webm || mp4
            ? (
              <video
                ref={this.registerVideoRef}
                controls={false}
                loop
                poster={this.getThumbnail()}
              >
                {webm && <source src={webm} type="video/webm" />}
                {mp4 && <source src={mp4} type="video/mp4" />}
              </video>
            )
            : <img alt="" src={this.getThumbnail()} />
          }
        </Link>
      </li>
    )
  }
}

ProjectListItem.propTypes = {
  post: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

export default ProjectListItem
