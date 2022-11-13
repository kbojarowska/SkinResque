import Heading from '../../components/Heading/Heading'
import Text from '../../components/Text/Text'
import './RecipeDetails.scss'
function RecipeDetails() {

  const cream={
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
    <div className='page'>
        <div className='pink'>
            <img src='/images/pink-spot.png' className='pink-spot'></img>
            <img src='/images/small-pink-dots.png' className='small-pink-dots'></img>
            <img src='/images/yellow-spot.png' className='yellow-spot'></img>
            <div className='beige-bg'>
              <Heading className='heading'>{cream.name.toUpperCase()}</Heading>
              <div className='details-container'>
                <img src={cream.img} className='img'></img>
                <div className='dark-beige-bg'>
                  <div className='border'>
                    <Text size='small' className='text'> {cream.details}</Text>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div className='white'>
            <img src='/images/rosemary-sprig.png' className='rosemary-sprig-left'></img>
            <img src='/images/rosemary-sprig.png' className='rosemary-sprig-right'></img>
            <div className='beige-bg-recipe'>
              <Heading className='heading'>Recipe</Heading>
              <div className='details-container'>
                <div className='dark-beige-bg border ingredients'>
                  <Heading className='ing'>Ingredients</Heading>
                  <Text size="small">{cream.ingredients}</Text>
                </div>
                <Text className='recipe text'>{cream.recipe}{cream.recipe}</Text>
              </div>
            </div>
        </div>
    </div>
  )
}

export default RecipeDetails