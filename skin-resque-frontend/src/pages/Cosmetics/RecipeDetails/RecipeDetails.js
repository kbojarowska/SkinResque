//import { useParams } from 'react-router-dom';
import { Heading, Text } from '../../components'
import './RecipeDetails.scss'
function RecipeDetails() {

	//const { cosmeticId } = useParams();

	const cosmetic = {
		"id": 1,
		"name": "rosemary cream",
		"details": `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
    in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
		"ingredients": `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
    in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
		"recipe": `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
    in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
		"img": "/images/cream.png"
	}

	return (
		<div className='page' style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/bg-cosmetics.svg')` }}>
			<div className='beige-bg'>
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
			</div>
		</div>
	)
}

export default RecipeDetails