import { Link } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import Text from '../../../components/Text/Text';
import './Info.scss';

function Info() {
	return (
		<div className='info-container'>
			<div className='info'>
				<Text size='small'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
					in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
					sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
			</div>
			<div className='start-button'>
				<Link to='/skintype-test/question/1'><Button>Start</Button></Link>
			</div>
		</div>
	);
}

export default Info;