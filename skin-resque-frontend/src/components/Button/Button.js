import PropTypes from 'prop-types'
import './Button.scss'
import Heading from '../Heading/Heading'

export default function Button({onClick, children, className})
{
  return (
    <button onClick={onClick} className={className}><Heading size='small'>{children}</Heading></button>
  )
}

Heading.propTypes = {
  size: PropTypes.func,
  className: PropTypes.string
}