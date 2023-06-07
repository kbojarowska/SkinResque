import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { FiSave } from 'react-icons/fi';
import { Heading, Modal, Text } from '../../../components'
import { getCosmetic } from '../../../../ducks/Cosmetics/selectors';
import { addCosmetic } from '../../../../ducks/User/actions';
import { getUser } from '../../../../ducks/User/selectors';

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


function RecipeDetails({ cosmetic, addCosmetic, user }) {

	const [isOpen, setIsOpen] = useState(false);

	const ingredients = cosmetic && cosmetic.ingredients.map((ing) => {
		return (
			<Text key={ing} size="small">{ing}</Text>
		)
	})
	
	const saveCosmetic = (cosmeticId) => {
		const userId = Cookies.get('userId');
		const token = Cookies.get('accessToken');
		addCosmetic(userId, cosmeticId, token);
	}

	return (
		<div className='page' style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/bg-cosmetics.svg')` }}>
			<div className='beige-bg'>
				{cosmetic ?
					<div>
						<Heading className='heading'>{cosmetic.name.toUpperCase()}
						{ Object.keys(user).length > 0 ? <div className='save' onClick={() => setIsOpen(true)}>
						<FiSave size={25}/>
						</div> : null}
						{isOpen && <Modal setIsOpen={setIsOpen} onSave={() => saveCosmetic(cosmetic._id)}/>}</Heading>
						<div className='details-container'>
							<img src={cosmetic.photo} className='img'></img>
							<div className='dark-beige-bg'>
								<div className='border'>
									<Text size='small' className='text'> {cosmetic.description}</Text>
								</div>
							</div>
						</div>
						<Heading className='heading-recipe'>Recipe</Heading>
						<div className='details-container'>
							<div className='dark-beige-bg border ingredients'>
								<Heading className='ing'>Ingredients</Heading>
								{cosmetic ? ingredients : ''}
							</div>
							<Text className='recipe text'>{cosmetic.recipe}</Text>
						</div>
					</div> : 
					<Heading size="x-large" className='no-data'>No cosmetic data</Heading>
				}
			</div>
		</div>
	)
}

const mapStateToProps = (state, props) => {
    return {
        cosmetic: getCosmetic(state, props.router.params.cosmeticId),
		user: getUser(state)
    };
}

const mapDispatchToProps = {
	addCosmetic
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeDetails));