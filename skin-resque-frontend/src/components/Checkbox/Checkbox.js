import { useState } from 'react';
import PropTypes from 'prop-types';
import Text from '../Text/Text';
import './Checkbox.scss';

function Checkbox({checked, children}) {
	const [isChecked, setIsChecked] = useState(checked);

	return (
		<div className='checkbox-wrapper'>
			<input type='checkbox' onChange={() => setIsChecked((prev) => !prev)} value={isChecked}/>
			<Text>{children}</Text>
		</div>
	);
};

export default Checkbox;

Checkbox.propTypes = {
  checked: PropTypes.bool
};