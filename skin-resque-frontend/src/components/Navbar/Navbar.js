import './Navbar.scss';
import Heading from '../Heading/Heading';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='navbar'>
        <div className='pageTitle'>
            Skin ResQ
        </div>
        <div className='linkList'>
                <Link to='/'><Heading size='small'>HOME</Heading></Link>
                <Link to='/cosmetics/page/1'><Heading size='small'>COSMETICS</Heading></Link>
                <Link to='/login'><Heading size='small'>LOG IN</Heading></Link>
        </div>
    </div>
  );
}

export default Navbar;