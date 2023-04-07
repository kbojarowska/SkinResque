import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FiSave } from 'react-icons/fi';
import { Heading, Modal, Text } from '../../../components'
import { getCosmetic } from '../../../../ducks/Cosmetics/selectors';

import './RecipeDetails.scss'

function withRouter(Component){
    function ComponentWithRouterProp(props){
        let params = useParams();
        return(
            <Component
                {...props}
                router={{ params }}
            />
        );
    }
    return ComponentWithRouterProp;
}


function RecipeDetails({ cosmetic }) {

	const URL = 'http://localhost:5000/users'
	const { cosmeticId } = useParams();
	const [isOpen, setIsOpen] = useState(false);

	const saveCosmetic = () => {
		const userId = Cookies.get('userId');
		const token = Cookies.get('accessToken');
		axios.patch(`${URL}/${userId}/cosmetics/${cosmeticId}?token=${token}`).then((response) => {
			console.log(response);
		}).catch((error) => {
			console.log(error);
		})
	}

	return (
		<div className='page' style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/bg-cosmetics.svg')` }}>
			<div className='beige-bg'>
				{cosmetic ?
					<div>
						<Heading className='heading'>{cosmetic.name.toUpperCase()}
						<div className='save' onClick={() => setIsOpen(true)}>
						<FiSave size={25}/>
						</div>
						{isOpen && <Modal setIsOpen={setIsOpen} onSave={saveCosmetic}/>}</Heading>
						<div className='details-container'>
							<img src={cosmetic.photo} className='img'></img>
							<div className='dark-beige-bg'>
								<div className='border'>
									<Text size='small' className='text'> {cosmetic.description}</Text>
								</div>
							</div>
						</div>
						<Heading className='heading'>Recipe</Heading>
						<div className='details-container'>
							<div className='dark-beige-bg border ingredients'>
								<Heading className='ing'>Ingredients</Heading>
								<Text size='small'>{cosmetic.ingredients}</Text>
							</div>
							<Text className='recipe text'>{cosmetic.recipe}{cosmetic.recipe}</Text>
						</div>
					</div> : 
					<Text size='small'>No cosmetic data</Text>
				}
			</div>
		</div>
	)
}

const mapStateToProps = (state, props) => {
    return {
        cosmetic: getCosmetic(state, props.router.params.cosmeticId),
    };
}


export default withRouter(connect(mapStateToProps, null)(RecipeDetails));