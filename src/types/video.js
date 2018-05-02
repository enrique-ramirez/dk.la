import PropTypes from 'prop-types'

const video = PropTypes.shape({
  id: PropTypes.string,
  type: PropTypes.string,
  src: PropTypes.string,
  thumbnail: PropTypes.string,
  url: PropTypes.string,
})

export default video
