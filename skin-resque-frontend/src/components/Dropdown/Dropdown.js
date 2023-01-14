import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Text from '../Text/Text';
import Button from '../Button/Button';
import './Dropdown.scss';

function Dropdown({ links, buttonText }) {

	const [displayLinks, setDisplayLinks] = useState(false);

	const LinksoDisplay = links.map((link) => {
		return (
			<Link to={link.page} key={link.page}><Text size='small'>{link.displayText}</Text></Link>
		)
	})

	const handleDisplayLinks = () => {
		setDisplayLinks(!displayLinks);
	}

	return (
		<div className='dropdown'>
			<Button className='dropdown-button' onClick={handleDisplayLinks}>{buttonText}</Button>
			{displayLinks ? <div className='links'>
				{LinksoDisplay}
			</div> : null}
		</div>
	);
};

export default Dropdown;

Dropdown.propTypes = {
	links: PropTypes.array,
	buttonText: PropTypes.string
};