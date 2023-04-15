import { connect } from "react-redux";
import { getCosmetic } from "../../../../ducks/Cosmetics/selectors";
import { useParams } from "react-router-dom";
import { useState } from 'react';
import { FiSave } from 'react-icons/fi';
import { Heading, Modal, Text } from '../../../components'

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

	const [isOpen, setIsOpen] = useState(false);
	console.log(cosmetic)

	return (
		<div className='page' style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/bg-cosmetics.svg')` }}>
			<div className='beige-bg'>
				{cosmetic ?
					<div>
						<Heading className='heading'>{cosmetic.name.toUpperCase()}
						<div className='save' onClick={() => setIsOpen(true)}>
						<FiSave size={25}/>
						</div>
						{isOpen && <Modal setIsOpen={setIsOpen} />}</Heading>
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
								<Text size="small">{cosmetic.ingredients}</Text>
							</div>
							<Text className='recipe text'>{cosmetic.recipe}{cosmetic.recipe}</Text>
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
    };
}


export default withRouter(connect(mapStateToProps, null)(RecipeDetails));