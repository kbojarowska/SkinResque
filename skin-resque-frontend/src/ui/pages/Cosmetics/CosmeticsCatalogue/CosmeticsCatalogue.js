import { connect } from "react-redux";
import { getCosmetics } from "../../../../ducks/Cosmetics/selectors";
import { Link, useParams } from 'react-router-dom';
import { Arrow, Heading, Pagination, RadioButton, Text } from '../../../components';
import './CosmeticsCatalogue.scss';
import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

function CosmeticsCatalogue({cosmetics}) {

	const { currentPage } = useParams();
	const [ isOpen, setIsOpen ] = useState(false);
	const [filterBy, setFilterBy] = useState("");
	const navigate = useNavigate();
  	const location = useLocation();

	const skintypeFilterChangeHandler = (e) => {
		const type = e.target.value;
		setFilterBy(type);
		navigate({
			search: new URLSearchParams({
			  ...Object.fromEntries(new URLSearchParams(location.search)),
			  type,
			}).toString(),
		  });
	  };

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
			<div className={`filter-container ${isOpen ? 'open' : ''}`}>
				{isOpen ? <Arrow left className="arrow" onClick={() => setIsOpen(!isOpen)}/> : <Arrow right className="arrow" onClick={() => setIsOpen(!isOpen)}/>}
				{isOpen && <div className={`filter ${isOpen ? 'open' : ''}`}>
					<Text className='text'>Filter by skintype:</Text>
					<RadioButton key="0" changed={skintypeFilterChangeHandler} isSelected={filterBy=== ""} value="" label="no filter"/>
					<RadioButton key="dry" changed={skintypeFilterChangeHandler} isSelected={filterBy=== "dry"} value="dry" label="dry"/>
					<RadioButton key="normal" changed={skintypeFilterChangeHandler} isSelected={filterBy=== "normal"} value="normal" label="normal"/>
					<RadioButton key="oily" changed={skintypeFilterChangeHandler} isSelected={filterBy=== "oily"} value="oily" label="oily"/>
					<RadioButton key="mixed" changed={skintypeFilterChangeHandler} isSelected={filterBy=== "mixed"} value="mixed" label="mixed"/>
				</div>}
			</div>
			<div className='catalogue'>
				<div className='page-title'>
					<Heading size='large'>Cosmetics</Heading>
				</div>
				<div className='cosmetics-list'>
					{cosmetics.length>0 && cosmeticsList ?  cosmeticsList : <Heading size="x-large" className='no-data'>No cosmetics to display</Heading>}
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

