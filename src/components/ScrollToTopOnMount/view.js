import React from 'react'

// eslint-disable-next-line react/prefer-stateless-function
class ScrollToTopOnMount extends React.Component { // eslint-disable-line react/require-optimization
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return null
  }
}

export default ScrollToTopOnMount
