import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Heading, Pagination, Text } from '../../../components';
import './CosmeticsCatalogue.scss';

function CosmeticsCatalogue() {

	const { currentPage } = useParams();
	const API_URL = 'http://localhost:5000/'

	const [cosmetics, setCosmetics] = useState([
		{
			"_id": 1,
			"name": "osemary cream",
			"description": "Dry",
			"recipe": "Combine all ingredients. Apply to face and let dry before rinsing. The powerful ingredients make this a multi-tasking wonder-cream: Sour cream is a form of lactic acid that hydrates as it gently exfoliates; honey is a humectant that also boosts hydration while the protein in the egg white tightens and firms skin.",
			"ingredients": ["1 tablespoon cocoa powder", "1 tablespoon sour cream", "1 egg white"],
			'photo': '/images/cream.png',
		},
		{
			"_id": 2,
			"name": "coconut balm",
			"description": "Dry",
			"recipe": "Heat 2 to 3 cups whole milk (enough to completely submerge both hands) in the microwave until it's warm. Pour into a bowl and let hands soak for five to 10 minutes, allowing the fat from the milk to hydrate, and vitamins A and E to nourish dry skin.",
			"ingredients": ["2-3 cups whole milk"],
			'photo': '/images/pink-cream.png',
		},
		{
			"_id": 3,
			"name": "lemon hydrolat",
			"description": "Oily",
			"recipe": "Combine 3 teaspoons ground oats and ¼ teaspoon apple cider in a bowl until a smooth paste forms. Then add ¼ tablespoon lemon juice and ½ tablespoon brown sugar; stir until the mixture is even. Apply to freshly cleansed skin and let sit for five to 10 minutes, allowing ingredients to penetrate top layers of the skin. Then rub in circular motions to exfoliate and increase blood-flow. Rinse off with warm water and pat dry with a towel.",
			"ingredients": ["3 teaspoons ground oats", "1/4 tablespoon apple cider", "1/4 tablespoon lemon juice", "1/2 tablespoon brown sugar"],
			'photo': '/images/blue-cream.png',
		},
		{
			"name": "Brightening Blueberry Face Mask",
			"description": "Oily",
			"recipe": "Combine all ingredients, spread onto face. Let sit for 15 to 20 minutes. Gently rinse with hands and warm water.",
			"ingredients": ["1 tablespoon crushed ripe blueberries", "1 tablespoon lemon juice", "1 tablespoon cucumber juice", "2 tablespoons baking soda", "2 tablespoons water"],
			'photo': '/images/pink-cream.png',
		},
		{
			"name": "Acne-Fighting Tea Leaves Face Toner",
			"description": "Oily",
			"recipe": "Combine 1 teaspoon peppermint tea leaves, 4 teaspoons white tea leaves, ½ cup boiled distilled water, and 2 drops of lavender oil in a French press. Let steep for 10 minutes before pouring into a glass container to cool. Combine with enough aloe vera gel to fill a 4-oz spray bottle atomizer. Store in the refrigerator before spritzing.",
			"ingredients": ["1 teaspoon pepermint tea leaves", "4 teaspoons white tea leaves", "1/2 cup boiled distilled water", "2 drops of lavender oil", "aloe vera gel"],
			'photo': '/images/blue-cream.png',
		},
		{
			"name": "Smoothing Honey Lip Scrub",
			"description": "Normal",
			"recipe": "Combine ingredients in a small bowl. Apply mixture with a new toothbrush in a gentle circular motion. Rinse off and follow up with your favorite lip balm.",
			"ingredients": ["1 teaspoon coconut oil", "1 teaspoon raw honey", "2 tablespoons raw sugar", "dash of lemon juice"],
			'photo': '/images/blue-cream.png',
		},
		{
			"name": "Exfoliating Sugar Face Scrub",
			"description": "Normal",
			"recipe": "Mix 1/2 cup brown sugar and 3 tablespoons of honey in a small bowl and stir until a thick paste forms. Add two tablespoons of an oil of your choice (olive, almond, or coconut) and blend until it integrates with the paste to make it a little lighter. Spread the paste all over clean skin — your face, neck, and decollete. Leave it on for five to 10 minutes and rinse with warm water. You can use any leftover scrub on the body for the same effect.",
			"ingredients": [ "1/2 cup brown sugar", "3 tablespoons of honey", "2 tablespoons of oil"],
			'photo': '/images/cream.png',
		},
		{
			"name": "Soothing Aloe Face Mask",
			"description": "Sensitive",
			"recipe": "Mix 1/2 tablespoon of almond milk with one tablespoon of brown sugar until the sugar dissolves. Add four tablespoons (approximately) of aloe vera juice or gel. Apply the mixture onto your face, let it sit for 15 to 20 minutes and remove with warm water and a soft towel.",
			"ingredients": ["1/2 tablespoon of almond milk", "1 tablespoon of brown sugar", "4 tablespoons of aloe vera juice or gel"],
			'photo': '/images/blue-cream.png',
		}
	]);

	useEffect(() => {
		console.log(`${API_URL}cosmetics?size=10&page=${currentPage}`)
		axios.get(`${API_URL}cosmetics?size=10&page=${currentPage}`).then((response) => {
			setCosmetics(response.data);
		}).catch((error) => {
			console.error(error);
			// alert('Something went wrong while downloading cosmetics data')
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
				{/* <div className='pagination'>
					<Pagination size={15} url='/cosmetics/page' color='gray' currentPage={currentPage} />
				</div> */}
			</div>
		</div>
	);
}

export default CosmeticsCatalogue;