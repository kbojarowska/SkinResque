import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Arrow, Button, Heading, Text } from '../../components';
import './FrontPage.scss';

function FrontPage() {

  const ingredients = [
    {
      "id": 1,
      "name": "rosemary",
      "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
      sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      "photo": '/images/rosemary.jpg',
    },
    {
      "id": 2,
      "name": "rosemary2",
      "description": `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
      sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      "photo": '/images/rosemary.jpg',
    }
  ]

  const [showIngredient, setShowIngredient] = useState(ingredients[0])

  function nextIngredient(){
    if(ingredients.find(el => el.id === showIngredient.id+1)){
      setShowIngredient(ingredients.find(el => el.id === showIngredient.id+1))
    } else {
      setShowIngredient(ingredients[0])
    }
  }

  function previousIngredient(){
    if(ingredients.find(el => el.id === showIngredient.id-1)){
      setShowIngredient(ingredients.find(el => el.id === showIngredient.id-1))
    } else {
      setShowIngredient(ingredients[ingredients.length -1 ])
    }
  }
  
	return (
		<div className='front-page'>
			<div className='pink'>
				<div className='conifer-bush-about'>
					<img src='/images/conifer-bush.png' />
					<div className='about'>
						<div className='page-about'>
							<Heading size='medium'>Page Information</Heading>
							<Text size='small'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
								ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
								ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
								in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
								sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
						</div>
					</div>
				</div>
			</div>
			<div className='white'>
				<div className='pink-dots'>
					<img src='/images/small-pink-dots.png'></img>
				</div>
			</div>
			<div className='photo-button-list linkList'>
				<div className='photo-button'>
					<img src='/images/skintype-test.png'></img>
					<Button><Link to='/skintype-test'>Skintype Test</Link></Button>
				</div>
				<div className='photo-button'>
					<img src='/images/color-test.png'></img>
					<Button><Link to='/color-test/try'>Color Test</Link></Button>
				</div>
				<div className='photo-button'>
					<img src='/images/cosmetic-recipes.png'></img>
					<Button><Link to='/cosmetic-list'>Cosmetic Recipes</Link></Button>
				</div>
			</div>
			<div className='water-drops'>
				<img src='/images/water-drops.png'></img>
				<img src='/images/water-drops.png'></img>
				<img src='/images/water-drops.png' ></img>
			</div>
			<div className='green'></div>
			<img src='/images/front-page-skin-photo.jpg' className='skin-photo'></img>
			<div className='white-info'>
        <div key={showIngredient.id} className='info-container'>
          <Arrow left onClick={previousIngredient}/>
          <div className='info-text'>
            <Heading>{showIngredient.name.toUpperCase()}</Heading>
            <Text>{showIngredient.description}</Text>
          </div>
          <div className='photo-container'>
            <img src='/images/dots.png' className='dots'></img>
            <div className='bg-pink'>
              <div className='behind-bg'>
                <img src={showIngredient.photo} className='info-pic'></img>
              </div>
            </div>
          </div>
          <Arrow right onClick={nextIngredient}/>
        </div>
      </div>
		</div>
	);
}

export default FrontPage;