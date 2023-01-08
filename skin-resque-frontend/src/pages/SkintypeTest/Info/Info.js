import { Button, Text } from '../../../components';
import './Info.scss';

function Info({setShowQuestions}) {
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
				<Button onClick={() => setShowQuestions(true)}>Start</Button>
			</div>
		</div>
	);
}

export default Info;