import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Heading from '../Heading/Heading';
import './Pagination.scss';

export default function Pagination({ color, size }) {

	let pages = [];
	for (let i = 1; i <= size; i++) {
		pages.push(i);
	};

	const pagesList = pages.map((pageNumber) => {
		return (
			<Link to={`/cosmetics/page/${pageNumber}`} key={pageNumber} className={color}>
				<Heading key={pageNumber}>
					{pageNumber}
				</Heading>
			</Link>
		);
	});

	return (
		<div className='pagination-container'>
			{pagesList}
		</div>
	);
}

Pagination.propTypes = {
	colors: PropTypes.oneOf(['green', 'gray']),
	size: PropTypes.number
};