import { Button, Text } from '../../../components';
import './Info.scss';

function Info({setShowQuestions}) {
	return (
		<div className='info-container'>
			<div className='info'>
				<Text size='small'>
{`SkinType Test is a diagnostic tool that helps you determine your specific skin type by answering a series of questions. The test is designed to identify your skin concerns, the appearance and texture of your skin, and your daily skincare routine. The answers to these questions are then analyzed to determine your skin type, which can be dry, oily, combination or normal.
Once you had completed the test, you will be provided with recommendations for cosmetics that are best suited for your skin.
Please note that you should always consult a dermatologist if you have any concerns.`}</Text>
			</div>
			<div className='start-button'>
				<Button onClick={() => setShowQuestions(true)}>Start</Button>
			</div>
		</div>
	);
}

export default Info;