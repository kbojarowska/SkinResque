import PropTypes from 'prop-types'
import './Heading.scss'

export default function Heading({size, className='', onClick, children}){
    const tags = {
        "x-large": "h1",
        "large": "h2",
        "medium": "h3",
        "small": "h4"
    }
    const Tag = tags[size]
  return (
    <Tag className={className} onClick={onClick}>{children}</Tag>
  )
}

Heading.defaultProps = {
  size: 'medium'
}

Heading.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'x-large']),
}
