import './FrontPage.scss';
import photo from '../../resources/front-page-skin-photo.jpg';

function FrontPage() {
  return (
    <div className='frontPage'>
      <div className='pink'></div>
      <div className='white'></div>
      <div className='green'></div>
      <img src={photo}></img>
      <div className='white'></div>
    </div>
  );
}

export default FrontPage;