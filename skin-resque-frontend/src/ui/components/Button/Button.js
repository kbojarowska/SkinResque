import PropTypes from 'prop-types';
import Heading from '../Heading/Heading';
import './Button.scss';

export default function Button({ size, className, disabled, onClick, children }) {
  return (
    <button 
		onClick={onClick}
		className={`${className} ${size}`} 
		type='button'
		disabled={disabled}
	>
		<Heading size='small'>
			{children}
		</Heading>
	</button>
  );
};

Button.defaultProps = {
	size: 'medium',
	disabled: false
}

Button.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};