import React from 'react'
import PropTypes from 'prop-types'
import './Text.scss'

export default function Text({size}) {
  return (
    <p className={size}>Text</p>
  )
}

Text.defaultProps = {
  size: 'medium'
}

Text.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'x-large'])
}
