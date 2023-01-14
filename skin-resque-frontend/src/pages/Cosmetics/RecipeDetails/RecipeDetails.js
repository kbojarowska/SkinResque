import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heading, Text } from '../../../components'
import axios from 'axios';

import './RecipeDetails.scss'
function RecipeDetails() {

	const { cosmeticId } = useParams();

	const [cosmetic, setCosmetic] = useState(null);

	useEffect(() => {
		axios.get(`http://localhost:5000/cosmetics/${cosmeticId}`).then((response) => {
			setCosmetic(response.data);
		}).catch((error) => {
			console.error(error);
			alert('Something went wrong while downloading cosmetic data')
		})
	});

	return (
		<div className='page' style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/bg-cosmetics.svg')` }}>
			<div className='beige-bg'>
				{cosmetic ?
					<div>
						<Heading className='heading'>{cosmetic.name.toUpperCase()}</Heading>
						<div className='details-container'>
							<img src={cosmetic.img} className='img'></img>
							<div className='dark-beige-bg'>
								<div className='border'>
									<Text size='small' className='text'> {cosmetic.details}</Text>
								</div>
							</div>
						</div>
						<Heading className='heading'>Recipe</Heading>
						<div className='details-container'>
							<div className='dark-beige-bg border ingredients'>
								<Heading className='ing'>Ingredients</Heading>
								<Text size="small">{cosmetic.ingredients}</Text>
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

export default RecipeDetails