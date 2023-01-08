import { Link, useParams } from 'react-router-dom';
import './CosmeticsCatalogue.scss';
import { Heading, Pagination, Text } from '../../../components';


const cosmetics = [
	{
		'id': 1,
		'name': 'rosemary cream',
		'description': `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
      sunt in culpa qui officia deserunt mollit anim id est laborum.`,
		'photo': '/images/cream.png',
	},
	{
		'id': 2,
		'name': 'rosemary cream',
		'description': `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
      sunt in culpa qui officia deserunt mollit anim id est laborum.`,
		'photo': '/images/cream.png',
	},
	{
		'id': 3,
		'name': 'rosemary cream',
		'description': `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
      sunt in culpa qui officia deserunt mollit anim id est laborum.`,
		'photo': '/images/cream.png',
	},
	{
		'id': 4,
		'name': 'rosemary cream',
		'description': `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
      sunt in culpa qui officia deserunt mollit anim id est laborum.`,
		'photo': '/images/cream.png',
	},
	{
		'id': 5,
		'name': 'rosemary cream',
		'description': `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
      sunt in culpa qui officia deserunt mollit anim id est laborum.`,
		'photo': '/images/cream.png',
	}
]

function CosmeticsCatalogue() {

	const { currentPage } = useParams();

	const cosmeticsList = cosmetics.map((cosmetic) => {
		return (
			<Link to={`/cosmetics/${cosmetic.id}`} key={cosmetic.id}>
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
					{cosmeticsList}
				</div>
				<div className='pagination'>
					<Pagination size={15} url='/cosmetics/page' color='gray' currentPage={currentPage} />
				</div>
			</div>
		</div>
	);
}

export default CosmeticsCatalogue;