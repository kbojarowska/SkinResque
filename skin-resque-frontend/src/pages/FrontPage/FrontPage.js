import './FrontPage.scss';
import photo from '../../resources/front-page-skin-photo.jpg';
import Button from '../../components/Button/Button'

function FrontPage() {
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
      <div className='white'></div>
    </div>
  );
}

export default FrontPage;