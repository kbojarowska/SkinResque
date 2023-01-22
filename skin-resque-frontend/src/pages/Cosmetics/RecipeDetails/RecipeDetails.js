import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heading, Text } from '../../../components'
import axios from 'axios';

import './RecipeDetails.scss'
function RecipeDetails() {

	const { cosmeticId } = useParams();

	const cosmetics = [{
		"_id": 1,
		"name": "rosemary cream",
		"description": "Rosemary skin cream is a natural skin care product that is made with rosemary extract. It is a light, refreshing cream that is perfect for all skin types. It is a non-greasy cream that is quickly absorbed into the skin, and it leaves the skin feeling soft and smooth. Rosemary skin",
		"recipe": "Combine the rosewater, grapeseed oil, beeswax, shea butter, cocoa butter, emulsifying wax, vitamin E oil, rosehip oil, lavender oil, geranium oil, rose absolute, rose otto, palmarosa oil, and lemon oil in a double boiler or a glass jar set in a pot of simmering water. Heat the ingredients until they are melted and well combined. Remove the mixture from the heat and let it cool. Pour the mixture into a blender and blend until it is smooth.5. Pour the cream into a jar and store it in the fridge.",
		"ingredients": ["1 cup rosewater", "1/2 cup grapeseed oil", "1/4 cup beeswax","1/4 cup shea butter","1/4 cup cocoa butter","1/4 cup emulsifying wax","1/4 cup vitamin E oil","1/4 cup rosehip oil","1/4 cup lavender oil","1/4 cup geranium oil","1/4 cup rose absolute","1/4 cup rose otto","1/4 cup palmarosa oil","1/4 cup lemon oil"],
		'photo': '/images/cream.png',
	},
	{
		"_id": 2,
		"name": "coconut balm",
		"description": "Coconut balm is a natural moisturizer that is made from coconut oil and beeswax. It is a thick, white cream that is used to soften and soothe the skin. Coconut balm is a natural alternative to store-bought moisturizers, and it is also a good lip balm.",
		"recipe": "Heat 2 to 3 cups whole milk (enough to completely submerge both hands) in the microwave until it's warm. Pour into a bowl and let hands soak for five to 10 minutes, allowing the fat from the milk to hydrate, and vitamins A and E to nourish dry skin.",
		"ingredients": ["2-3 cups whole milk"],
		'photo': '/images/pink-cream.png',
	},
	{
		"_id": 3,
		"name": "lemon hydrolat",
		"description": "Lemon hydrolat is a refreshing and uplifting water-based extract of lemon peel. It has a light, lemony scent and is a natural astringent. Lemon hydrolat is beneficial for oily or acne-prone skin.",
		"recipe": "Combine 3 teaspoons ground oats and ¼ teaspoon apple cider in a bowl until a smooth paste forms. Then add ¼ tablespoon lemon juice and ½ tablespoon brown sugar; stir until the mixture is even. Apply to freshly cleansed skin and let sit for five to 10 minutes, allowing ingredients to penetrate top layers of the skin. Then rub in circular motions to exfoliate and increase blood-flow. Rinse off with warm water and pat dry with a towel.",
		"ingredients": ["3 teaspoons ground oats", "1/4 tablespoon apple cider", "1/4 tablespoon lemon juice", "1/2 tablespoon brown sugar"],
		'photo': '/images/blue-cream.png',
	}]

	const [cosmetic, setCosmetic] = useState(cosmetics.find(x=> x._id === parseInt(cosmeticId)));

	// useEffect(() => {
	// 	axios.get(`http://localhost:5000/cosmetics/${cosmeticId}`).then((response) => {
	// 		setCosmetic(response.data);
	// 	}).catch((error) => {
	// 		console.error(error);
	// 		alert('Something went wrong while downloading cosmetic data')
	// 	})
	// });

	return (
		<div className='page' style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/bg-cosmetics.svg')` }}>
			<div className='beige-bg'>
				{cosmetic ?
					<div>
						<Heading className='heading'>{cosmetic.name.toUpperCase()}</Heading>
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