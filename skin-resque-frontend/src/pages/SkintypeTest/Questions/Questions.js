import { Link } from 'react-router-dom';

import Arrow from '../../../components/Arrow/Arrow';
//import Checkbox from '../../../components/Checkbox/Checkbox';
import Heading from '../../../components/Heading/Heading';
import Pagination from '../../../components/Pagination/Pagination';
import './Questions.scss';

function Questions({ currentQuestion, numberOfQuestions }) {

	const currentQuestionNumber = parseInt(currentQuestion);

	return (
		<div className='questions-pagination'>
			<div className='questions-container'>
				<div className='questions'>
					<div className='question-number'>
						<Heading>Question 1.</Heading>
					</div>
					<div className='answers-arrows'>
						<div className='arrows'>
							<div className='arrow'>
								{currentQuestionNumber != 1 ? <Link to={`/skintype-test/question/${currentQuestionNumber - 1}`}><Arrow left /></Link> : <div className='hide'><Arrow left /></div>}
							</div>
							<div className='answers'>
								<div className='answer'>
									{/*<Checkbox checked={false}>Ut enim ad minim veniam, quis nostrud exercitation ullamco</Checkbox>*/}
								</div>
								<div className='answer'>
									{/*<Checkbox checked={false}>Ut enim ad minim veniam, quis nostrud exercitation ullamco</Checkbox>*/}
								</div>
								<div className='answer'>
									{/*<Checkbox checked={false}>Ut enim ad minim veniam, quis nostrud exercitation ullamco</Checkbox>*/}
								</div>
							</div>
							<div className='arrow'>
								{currentQuestionNumber != numberOfQuestions ? <Link to={`/skintype-test/question/${currentQuestionNumber + 1}`}><Arrow right /></Link> : <div className='hide'><Arrow right /></div>}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='pagination'>
				<Pagination size={numberOfQuestions} color='gray' currentPage={currentQuestionNumber.toString()} url='/skintype-test/question' />
				<img src='/images/urban-stone.png' />
			</div>
		</div>
	);
}

export default Questions;