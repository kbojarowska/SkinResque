import PropTypes from 'prop-types';
import Text from '../Text/Text';
import './Checkbox.scss';

function Checkbox({ checked, children, onClick }) {
	return (
		<div className='checkbox-wrapper' onClick={onClick}>
			<input type='checkbox' value={checked} className={checked ? 'checked' : ''} />
			<Text>{children}</Text>
		</div>
	);
};

export default Checkbox;

Checkbox.propTypes = {
	checked: PropTypes.bool
};