import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Heading, Text, Arrow } from '../../components';
import './FrontPage.scss';

function FrontPage() {

  const ingredients = [
    {
      'id': 1,
      'name': 'oat',
      'description': `Oats are a natural humectant, meaning that they can help to hydrate and moisturize the skin by attracting and retaining water.
		This makes oats a useful ingredient in moisturizers and other skincare products.
	  Oats also contain compounds called saponins, which have gentle cleansing properties that can help to remove dirt and oil from the skin without stripping it of its natural oils. This makes oats a good choice for people with sensitive or dry skin who may be more prone to irritation from harsher cleansers.`,
      'photo': '/images/oat.jpg',
    },
    {
      'id': 2,
      'name': 'rosemary',
      'description': `One of the main benefits of rosemary for the skin is its antioxidant properties. Rosemary contains compounds such as rosmarinic acid and carnosic acid, which can help to neutralize free radicals in the skin. Free radicals are unstable molecules that can damage skin cells and contribute to the aging process. By neutralizing these free radicals, rosemary can help to protect the skin from premature aging and other forms of damage.
	  Rosemary also has anti-inflammatory properties, which can be beneficial for people with inflammatory skin conditions such as acne, rosacea, or eczema. The anti-inflammatory compounds in rosemary can help to calm redness and irritation in the skin, and may also help to reduce swelling.`,
      'photo': '/images/rosemary.jpg',
    },
	{
		'id': 3,
		'name': 'green clay',
		'description': `Green clay, also known as bentonite clay, is a natural substance that is often used in skincare products due to its ability to absorb excess oil and impurities from the skin.
		When applied to the skin, green clay can help to unclog pores and remove dirt, oil, and other impurities. This makes it a useful ingredient in products designed to treat acne or oily skin.
		In addition to its cleansing properties, green clay also has anti-inflammatory and soothing properties that can help to calm irritated or inflamed skin. This makes it a useful ingredient in products designed to treat conditions such as eczema or psoriasis.
		Green clay also contains minerals such as calcium, magnesium, and potassium, which can help to nourish and strengthen the skin. These minerals can help to improve the overall health and appearance of the skin, making it look smoother and more radiant.`,
		'photo': '/images/green-clay.jpg',
	},
	{
		'id': 4,
		'name': 'raspberry',
		'description': `Raspberries are high in antioxidants such as vitamin C, which can help to protect the skin from damage caused by free radicals. Free radicals are unstable molecules that can cause cellular damage and contribute to the aging process. By neutralizing these free radicals, antioxidants can help to keep the skin looking healthy and youthful.
		They  are a natural source of alpha-linolenic acid, which is an essential fatty acid that can help to hydrate and moisturize the skin. This makes raspberries a useful ingredient in moisturizers and other skincare products.`,
		'photo': '/images/raspberry.jpg',
	},
	{
		'id': 5,
		'name': 'honey',
		'description': `Honey is a natural humectant, which means it can help to attract and retain moisture in the skin. This makes it a useful ingredient in moisturizers and other skincare products designed to hydrate and soothe dry, irritated skin.
		It also has natural antibacterial properties, which can help to prevent and treat bacterial infections in the skin. This makes it a useful ingredient in products designed to treat acne or other bacterial skin conditions.`,
		'photo': '/images/honey.jpg',
	},
	{
		'id': 6,
		'name': 'almond',
		'description': `Almonds contain healthy fats and vitamin E, which can help to nourish and moisturize the skin. This makes them a useful ingredient in products designed to hydrate and soothe dry, irritated skin.
		Ground almond shells can be used as a natural exfoliant to gently remove dead skin cells and improve the texture and appearance of the skin. Almonds contain compounds such as quercetin and kaempferol, which have anti-inflammatory
		properties that can help to reduce redness, swelling, and irritation in the skin.`,
		'photo': '/images/almond.jpg',
	},
	{
		'id': 7,
		'name': 'aloe',
		'description': `Aloe has natural anti-inflammatory properties, which can help to soothe and calm irritated or inflamed skin.
		It also contains compounds such as acemannan, which have been shown to promote wound healing and tissue repair in the skin. This makes it a useful ingredient in products designed to treat cuts, burns, or other skin injuries.`,
		'photo': '/images/aloe.jpg',
	},
	{
		'id': 8,
		'name': 'shea butter',
		'description': ` Shea butter contains antioxidants such as vitamin A and vitamin E, which can help to protect the skin from damage caused by free radicals. Free radicals are unstable molecules that can cause cellular damage and contribute to the aging process.
		It also contains natural sun-protective agents such as cinnamic acid, which can help to protect the skin from UV damage caused by the sun's rays.`,
		'photo': '/images/shea-butter.jpg',
	},
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
					<img className='conifer'src='/images/conifer-bush.png' />
					<div className='about'>
						<div className='page-about'>
							<Heading size='medium'>We care about skin</Heading>
							<Text size='small'>{
							`Skin ResQ was created for people who want to start their journey with natural cosmetics.
							We offer a wide range of recipes, which everyone will find effortless.
							Don't know which cosmetics you should use? Try our dedicated test to find your skin type!
							`}</Text>
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
					<Button><Link to='/color-test/info'>Color Test</Link></Button>
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