import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { is } from 'immutable'
import { Helmet } from 'react-helmet'

import Page from 'components/Page'
import htmlDecode from 'utils/htmlDecode'

// eslint-disable-next-line react/prefer-stateless-function
class ViewPage extends React.Component {
  componentWillMount() {
    const {
      loadPage,
      viewPage,
      route,
    } = this.props

    if (viewPage.get('loading')) {
      loadPage(route.match.params.slug)
    }
  }

  shouldComponentUpdate(nextProps) {
    const { props } = this

    return !is(nextProps.viewPost, props.viewPage)
  }

  render() {
    const {
      viewPage,
    } = this.props

    return (
      <section>
        <Helmet>
          <title>{htmlDecode(viewPage.getIn(['page', 'title', 'rendered']))}</title>
        </Helmet>

        <Page
          isLoading={viewPage.get('loading')}
          page={viewPage.get('page').toJS()}
        />
      </section>
    )
  }
}

ViewPage.propTypes = {
  /** Function to request viewPage page. */
  loadPage: PropTypes.func,
  /** Route state */
  route: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  /** ViewPage state */
  viewPage: ImmutablePropTypes.map, // eslint-disable-line react/no-typos
}

export default ViewPage
