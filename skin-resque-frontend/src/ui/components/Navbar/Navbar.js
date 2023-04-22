import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../../ducks/User/selectors';
import { logoutUser } from '../../../ducks/User/actions';
import Dropdown from '../../components/Dropdown/Dropdown';
import Heading from '../Heading/Heading';
import './Navbar.scss';

function Navbar({ user, logoutUser }) {

	const navigate = useNavigate();

	return (
		<div className='navbar'>
			<div className='pageTitle'>
				Skin ResQ
			</div>
			<div className='linkList'>
				<Link to='/'><Heading size='small'>HOME</Heading></Link>
				{ Object.keys(user).length > 0 && <Dropdown buttonText={'PROFILE'} links={[{page: `/userprofile/${Cookies.get('userId')}`, displayText: 'View'}, {page: `/editprofile/${Cookies.get('userId')}`, displayText: 'Edit'}]}/>}
				<Link to='/cosmetics/page/1'><Heading size='small'>COSMETICS</Heading></Link>
				{ Object.keys(user).length > 0 ? <Heading size='small'><button className='button-no-decoration' onClick={() => logoutUser(navigate)}>SIGN OUT</button></Heading> : <Link to='/login'><Heading size='small'>SIGN IN</Heading></Link>}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: getUser(state)
	};
};

const mapDispatchToProps = {
	logoutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);