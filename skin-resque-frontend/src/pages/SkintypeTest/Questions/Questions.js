import { Link } from 'react-router-dom';

import { Arrow, Checkbox, Heading, Pagination } from '../../../components';
import './Questions.scss';

function Questions({ currentQuestion, numberOfQuestions }) {

	const currentQuestionNumber = parseInt(currentQuestion);

	const questions = [
		{
			'id': 1,
			'question': 'Lorem ipsum?',
			'answers': [
				{
					'id': 1,
					'answer': 'Lorem ipsum'
				},
				{
					'id': 2,
					'answer': 'Dolor Sit Amet'
				},
				{
					'id': 3,
					'answer': 'nie'
				}
			]
		},
		{
			'id': 2,
			'question': 'Lorem ipsum2?',
			'answers': [
				{
					'id': 4,
					'answer': 'Lorem ipsum2'
				},
				{
					'id': 5,
					'answer': 'Dolor Sit Amet2'
				},
				{
					'id': 6,
					'answer': 'nie2'
				}
			]
		},
		{
			'id': 3,
			'question': 'Lorem ipsum3?',
			'answers': [
				{
					'id': 7,
					'answer': 'Lorem ipsum3'
				},
				{
					'id': 8,
					'answer': 'Dolor Sit Amet3'
				},
				{
					'id': 9,
					'answer': 'nie3'
				}
			]
		},
	]

	const answersToDisplay = questions.filter((question) => {
		return question.id == currentQuestionNumber
	})[0].answers.map((answer) => {
			return (<div className='answer' key={answer.id}>
			<Checkbox checked={false}>{answer.answer}</Checkbox>
					</div>
			)
	})

	return (
		<div className='questions-pagination'>
			<div className='questions-container'>
				<div className='questions'>
					<div className='question-number'>
						<Heading>Question {currentQuestionNumber}.</Heading>
					</div>
					<div className='answers-arrows'>
						<div className='arrows'>
							<div className='arrow'>
								{currentQuestionNumber != 1 ? <Link to={`/skintype-test/question/${currentQuestionNumber - 1}`}><Arrow left /></Link> : <div className='hide'><Arrow left /></div>}
							</div>
							<div className='answers'>
							{answersToDisplay && answersToDisplay}
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