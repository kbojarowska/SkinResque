import PropTypes from 'prop-types'
import './Text.scss'

export default function Text({size, children}) {
  return (
    <p className={size}>{children}</p>
  )
}

Text.defaultProps = {
  size: 'medium'
}

Text.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'x-large'])
}
