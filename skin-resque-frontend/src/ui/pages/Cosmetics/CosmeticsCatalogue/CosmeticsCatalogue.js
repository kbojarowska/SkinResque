import { connect } from "react-redux";
import { getCosmetics } from "../../../../ducks/Cosmetics/selectors";
import { Link, useParams } from 'react-router-dom';
import { Heading, Pagination, Text } from '../../../components';
import './CosmeticsCatalogue.scss';

function CosmeticsCatalogue({cosmetics}) {

	const { currentPage } = useParams();
	console.log(cosmetics)

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
					{cosmetics.length>0 && cosmeticsList ?  cosmeticsList : <Text size='small'>No cosmetics to display</Text>}
				</div>
				<div className='pagination'>
					<Pagination size={10} url='/cosmetics/page' color='gray' currentPage={currentPage} />
				</div>
			</div>
		</div>
	);
}
const mapStateToProps = (state) =>{
    return{
        cosmetics: getCosmetics(state),
    }
}

export default connect(mapStateToProps, null)(CosmeticsCatalogue);

