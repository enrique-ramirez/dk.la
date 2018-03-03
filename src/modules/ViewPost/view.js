import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { is } from 'immutable'
import { Helmet } from 'react-helmet'

import ImageGallery from 'components/ImageGallery'

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

    const images = viewPost.getIn(['post', 'acf', 'gallery'])

    return (
      <section>
        <Helmet>
          <title>{viewPost.getIn(['post', 'title', 'rendered'])}</title>
        </Helmet>

        {viewPost.getIn(['post', 'title', 'rendered'])}
        <ImageGallery images={images ? images.toJS() : []} />
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
