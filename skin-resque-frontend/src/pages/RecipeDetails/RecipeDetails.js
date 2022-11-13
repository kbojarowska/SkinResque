import './RecipeDetails.scss'
function RecipeDetails() {
  return (
    <div className='page'>
        <div className='pink'>
            <img src='/images/pink-spot.png' className='pink-spot'></img>
            <img src='/images/small-pink-dots.png' className='small-pink-dots'></img>
            <img src='/images/yellow-spot.png' className='yellow-spot'></img>
        </div>
        <div className='white'>
            <img src='/images/rosemary-sprig.png' className='rosemary-sprig-left'></img>
            <img src='/images/rosemary-sprig.png' className='rosemary-sprig-right'></img>
        </div>
    </div>
  )
}

export default RecipeDetails