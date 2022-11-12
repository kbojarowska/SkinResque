import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Heading from '../Heading/Heading';
import './Pagination.scss';

export default function Pagination({ color, size }) {

	const pages = (new Array(size)).fill(0);

	const pagesList = pages.map((_, index) => {
		const pageNumber = index + 1;
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