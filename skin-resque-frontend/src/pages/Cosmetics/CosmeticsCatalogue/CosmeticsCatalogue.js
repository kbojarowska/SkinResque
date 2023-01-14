import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Heading, Pagination, Text } from '../../../components';
import './CosmeticsCatalogue.scss';
import { Heading, Pagination, Text } from '../../../components';

function CosmeticsCatalogue() {

	const { currentPage } = useParams();
	const API_URL = 'http://localhost:5000/'

	const [cosmetics, setCosmetics] = useState([]);

	useEffect(() => {
		console.log(`${API_URL}cosmetics?size=10&page=${currentPage}`)
		axios.get(`${API_URL}cosmetics?size=10&page=${currentPage}`).then((response) => {
			setCosmetics(response.data);
		}).catch((error) => {
			console.error(error);
			alert('Something went wrong while downloading cosmetics data')
		})
	}, []);

	const cosmeticsList = cosmetics.map((cosmetic) => {
		return (
			<Link to={`/cosmetics/${cosmetic._id}`} key={cosmetic.id}>
				<button className='cosmetic'>
					<img src={cosmetic.photo}></img>
					<Text>{cosmetic.name}</Text>
				</button>
			</Link >
		)
	})

	return (
		<div className='cosmetics-page' style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/bg-cosmetics.svg')` }}>
			<div className='catalogue'>
				<div className='page-title'>
					<Heading size='large'>Cosmetics</Heading>
				</div>
				<div className='cosmetics-list'>
					{cosmetics && cosmeticsList ?  cosmeticsList : <Text size='small'>No cosmetics to display</Text>}
				</div>
				<div className='pagination'>
					<Pagination size={15} url='/cosmetics/page' color='gray' currentPage={currentPage} />
				</div>
			</div>
		</div>
	);
}

export default CosmeticsCatalogue;