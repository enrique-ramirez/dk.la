import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { is } from 'immutable'
import { Helmet } from 'react-helmet'

import Post from 'components/Post'

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
      viewPost,
    } = this.props

    return (
      <section>
        <Helmet>
          <title>{viewPost.getIn(['post', 'title', 'rendered'])}</title>
        </Helmet>

        <Post isLoading={viewPost.get('loading')} post={viewPost.get('post').toJS()} />
      </section>
    )
  }
}

ViewPost.propTypes = {
  /** Function to request viewPost page. */
  loadPost: PropTypes.func,
  /** Route state */
  route: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  /** ViewPost state */
  viewPost: ImmutablePropTypes.map, // eslint-disable-line react/no-typos
}

export default ViewPost
