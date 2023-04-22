import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.scss';
import Dropdown from '../../components/Dropdown/Dropdown';
import Heading from '../Heading/Heading';

function Navbar({ user, setUser }) {

	const navigate = useNavigate();

	const logOut = () => {
		Cookies.remove('username');
		Cookies.remove('userId');
		Cookies.remove('accessToken');
		setUser(null);
		return navigate('/login');
	}
	return (
		<div className='navbar'>
			<div className='pageTitle'>
				Skin ResQ
			</div>
			<div className='linkList'>
				<Link to='/'><Heading size='small'>HOME</Heading></Link>
				{ user && <Dropdown buttonText={'PROFILE'} links={[{page: `/userprofile/${Cookies.get('userId')}`, displayText: 'View'}, {page: '/editprofile', displayText: 'Edit'}]}/>}
				<Link to='/cosmetics/page/1'><Heading size='small'>COSMETICS</Heading></Link>
				{user ? <Heading size='small'><button className='button-no-decoration' onClick={logOut}>SIGN OUT</button></Heading> : <Link to='/login'><Heading size='small'>SIGN IN</Heading></Link>}
			</div>
		</div>
	);
}

export default Navbar;