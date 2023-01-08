import { useState } from 'react';
import { Arrow, Button, Checkbox, Heading } from '../../../components';
import './Questions.scss';

function Questions() {


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

	const [currentQuestion, setCurrentQuestion] = useState(1);

	const answersToDisplay = questions.filter((question) => {
		return question.id == currentQuestion
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
						<Heading>Question {currentQuestion}.</Heading>
					</div>
					<div className='answers-arrows'>
						<div className='arrows'>
							<div className='arrow'>
								{currentQuestion != 1 ? <Arrow left onClick={() => setCurrentQuestion(currentQuestion - 1)}/> : <div className='hide'><Arrow left /></div>}
							</div>
							<div className='answers'>
							{answersToDisplay}
							</div>
							<div className='arrow'>
								{currentQuestion != Object.keys(questions).length ? <Arrow right onClick={() => setCurrentQuestion(currentQuestion + 1)} /> : <div className='hide'><Arrow right /></div>}
								{currentQuestion == Object.keys(questions).length && <Button className='submit-answers'>Submit</Button>}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Questions;