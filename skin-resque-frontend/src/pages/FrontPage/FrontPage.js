import { useState } from 'react';
import './FrontPage.scss';
import photo from '../../resources/front-page-skin-photo.jpg';
import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';
import Heading from '../../components/Heading/Heading';
import Arrow from '../../components/Arrow/Arrow';

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
    <div className='frontPage'>
      <div className='pink'></div>
      <div className='white'></div>
      <div className='green'></div>
      <div>
        <div>
          <img></img>
        <Button>Skintype Test</Button>
        </div>
        <div>
          <img></img>
          <Button>Color Test</Button>
        </div>
        <div>
          <img></img>
          <Button>Cosmetic Recipes</Button>
        </div>
      </div>
      <img src={photo} className='skinPhoto'></img>
      <div className='white-info'>
        <div key={showIngredient.id} className='info-container'>
          <Arrow left onClick={previousIngredient}/>
          <div className='info-text'>
            <Heading>{showIngredient.name.toUpperCase()}</Heading>
            <Text>{showIngredient.description}</Text>
          </div>
          <div className='bg-pink'>
            <div className='behind-bg'>
              <img src={showIngredient.photo} className='info-pic'></img>
            </div>
          </div>
          <Arrow right onClick={nextIngredient}/>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;