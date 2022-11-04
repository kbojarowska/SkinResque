import React from 'react'
import PropTypes from 'prop-types'
import './Heading.scss'

export default function Heading({size, children}){
    const tags = {
        "x-large": "h1",
        "large": "h2",
        "medium": "h3",
        "small": "h4"
    }
    const Tag = tags[size]
  return (
    <Tag>{children}</Tag>
  )
}

Heading.defaultProps = {
  size: 'large'
}

Heading.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'x-large']),
}
