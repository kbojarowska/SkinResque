import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import PropTypes from 'prop-types'


function Arrow({left, right, onClick, className='', color}) {
  return (
    left || right ?
    <div className={className} onClick={onClick}>{left && !right ? <FiChevronLeft size={45} color={color}/> : <FiChevronRight size={45} color={color}/>}</div>
    : null
  )
}

export default Arrow

const requiredPropsCheck = (props, componentName) => {
  if (!props.left && !props.right) {
    return new Error(`One of 'left' or 'right' is required by '${componentName}' component.`)
  }
}

Arrow.propTypes = {
  left: requiredPropsCheck,
  right: requiredPropsCheck,
  onClick: PropTypes.func,
  color: PropTypes.string
}