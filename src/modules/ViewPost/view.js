import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { is } from 'immutable'
import { Helmet } from 'react-helmet'

import Post from 'components/Post'
import htmlDecode from 'utils/htmlDecode'

// eslint-disable-next-line react/prefer-stateless-function
class ViewPost extends React.Component {
  componentWillMount() {
    const {
      loadPost,
      viewPost,
      route,
    } = this.props

    if (viewPost.get('loading')) {
      loadPost(route.match.params.slug)
    }
  }

  shouldComponentUpdate(nextProps) {
    const { props } = this

    return !is(nextProps.viewPost, props.viewPost)
  }

  render() {
    const {
      changeVideo,
      imageClick,
      viewPost,
    } = this.props

    return (
      <section>
        <Helmet>
          <title>{htmlDecode(viewPost.getIn(['post', 'title', 'rendered']))}</title>
        </Helmet>

        <Post
          currentVideo={viewPost.get('currentVideo') ? viewPost.get('currentVideo').toJS() : undefined}
          handleChangeVideo={changeVideo}
          handleImageClick={imageClick}
          isLoading={viewPost.get('loading')}
          post={viewPost.get('post').toJS()}
        />
      </section>
    )
  }
}

ViewPost.propTypes = {
  /** Function to execute when clicking on video thumbnails */
  changeVideo: PropTypes.func,
  /** Handles click on image */
  imageClick: PropTypes.func,
  /** Function to request viewPost page. */
  loadPost: PropTypes.func,
  /** Route state */
  route: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  /** ViewPost state */
  viewPost: ImmutablePropTypes.map, // eslint-disable-line react/no-typos
}

export default ViewPost
