import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Heading from '../Heading/Heading';
import './Pagination.scss';

export default function Pagination({ url, color, size }) {

	const pagesList = (new Array(size)).fill(0).map((_, index) => {
		const pageNumber = index + 1;
		return (
			<Link to={`${url}/${pageNumber}`} key={pageNumber} className={color}>
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
	url: PropTypes.string,
	color: PropTypes.oneOf(['green', 'gray']),
	size: PropTypes.number
};