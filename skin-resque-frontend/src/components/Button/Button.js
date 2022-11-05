import PropTypes from 'prop-types'
import './Button.scss'
import Heading from '../Heading/Heading'

export default function Button({onClick, children})
{
  return (
    <button onClick={onClick}><Heading size='small'>{children}</Heading></button>
  )
}

Heading.propTypes = {
  size: PropTypes.func
}