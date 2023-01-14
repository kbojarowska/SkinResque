import { useState } from 'react';
import { Heading } from '../../../components';
import './SkintypeTestPage.scss';
import Info from '../Info/Info';
import Questions from '../Questions/Questions';


function SkintypeTestPage() {

	const [showQuestions, setShowQuestions] = useState(false);

	return (
		<div className='page'>
			<div className='page-title'>
				<Heading size='large'>Skintype Test</Heading>
			</div>
			<div className='skintype-test'>
				{!showQuestions && <Info setShowQuestions={setShowQuestions}/>}
				{showQuestions && <Questions/>}
			</div>
		</div>
	);
}

export default SkintypeTestPage;