import { useState } from 'react';
import { Arrow, Button, Checkbox, Heading } from '../../../components';
import './Questions.scss';

function Questions() {

	let questions = [
		{
			'id': 1,
			'question': 'Does your skin feel tight and dry after washing your face?',
			'answers': [
				{
					'id': 1,
					'answer': 'Yes, my whole skin feel like it',
					'type': 'dry',
					'checked': false
				},
				{
					'id': 2,
					'answer': 'Only on cheeks',
					'type': 'mixed',
					'checked': false
				},
				{
					'id': 3,
					'answer': 'No, it does not feel like it',
					'type': ['oily', 'normal'],
					'checked': false
				}
			]
		},
		{
			'id': 2,
			'question': 'Is your skin reactive to changes of seasons?',
			'answers': [
				{
					'id': 4,
					'answer': 'No',
					'type': ['normal'],
					'checked': false
				},
				{
					'id': 5,
					'answer': 'Yes',
					'type': ['oily', 'dry', 'mixed'],
					'checked': false
				}
			]
		},
		{
			'id': 3,
			'question': 'Do you have a lot of imprefections like pimples, blackheads?',
			'answers': [
				{
					'id': 6,
					'answer': 'No, I rarely have any imperfection on my skin',
					'type': ['dry', 'normal'],
					'checked': false
				},
				{
					'id': 7,
					'answer': 'Yes, but only in T-zone',
					'type': 'mixed',
					'checked': false
				},
				{
					'id': 8,
					'answer': 'Yes, on my whole face, including cheeks',
					'type': 'oily',
					'checked': false
				}
			]
		},
		{
			'id': 4,
			'question': 'Do you have a problem with shiny face after a whole day?',
			'answers': [
				{
					'id': 9,
					'answer': 'No, my skin is rather dull',
					'type': ['dry', 'normal'],
					'checked': false
				},
				{
					'id': 10,
					'answer': 'Yes, but only in T-zone',
					'type': 'mixed',
					'checked': false
				},
				{
					'id': 11,
					'answer': 'Yes, on my whole face, including cheeks',
					'type': 'oily',
					'checked': false
				}
			]
		},
		{
			'id': 5,
			'question': 'Does your skin itch sometimes?',
			'answers': [
				{
					'id': 12,
					'answer': 'Yes, it does happen sometimes',
					'type': 'dry',
					'checked': false
				},
				{
					'id': 13,
					'answer': 'Yes, but only on my cheeks',
					'type': 'mixed',
					'checked': false
				},
				{
					'id': 14,
					'answer': 'No, not really',
					'type': ['oily', 'normal'],
					'checked': false
				}
			]
		},
		{
			'id': 6,
			'question': 'Are you getting redness on your skin?',
			'answers': [
				{
					'id': 15,
					'answer': 'Yes, it does happen sometimes',
					'type': 'dry',
					'checked': false
				},
				{
					'id': 16,
					'answer': 'Yes, but only on my cheeks',
					'type': 'mixed',
					'checked': false
				},
				{
					'id': 17,
					'answer': 'No, not really',
					'type': 'normal',
					'checked': false
				},
				{
					'id': 18,
					'answer': 'Only because of my pimples',
					'type': 'oily',
					'checked': false
				}
			]
		},
		{
			'id': 7,
			'question': 'How would you describe your pores?',
			'answers': [
				{
					'id': 19,
					'answer': 'They are hardly visible',
					'type': ['dry', 'normal'],
					'checked': false
				},
				{
					'id': 20,
					'answer': 'They are very visible',
					'type': 'oily',
					'checked': false
				},
				{
					'id': 21,
					'answer': 'They are hardly visible on cheeks and very visible in T-zone',
					'type': ['mixed'],
					'checked': false
				},
			]
		},
		{
			'id': 8,
			'question': 'How prone to wrinkles are you?',
			'answers': [
				{
					'id': 22,
					'answer': 'Very',
					'type': 'dry',
					'checked': false
				},
				{
					'id': 23,
					'answer': 'Not really',
					'type': 'mixed',
					'checked': false
				},
				{
					'id': 24,
					'answer': "I can't really tell",
					'type': '',
					'checked': false
				},
			]
		},
	]

	console.log(questions);
	const getSkinTypeAccordingToGivenAnswers = (answers) => {
		return answers.sort((a, b) =>
			answers.filter(v => v === a).length
			- answers.filter(v => v === b).length
		).pop();
	}

	const [currentQuestion, setCurrentQuestion] = useState(1);
	const [answers, setAnswers] = useState([]);

	const answersToDisplay = questions.filter((question) => {
		return question.id == currentQuestion
	})[0].answers.map((answer) => {
		return (<div className='answer' key={answer.id}>
			<Checkbox checked={answer.checked} onClick={() => {answer.checked = !answer.checked;}}>{answer.answer}</Checkbox>
		</div>
		)
	})

	const questionToDisplay = questions.filter((question) => {
		return question.id == currentQuestion
	})[0].question

	return (
		<div className='questions-pagination'>
			<div className='questions-container'>
				<div className='questions'>
					<div className='question-number'>
						<Heading>{currentQuestion}. {questionToDisplay}</Heading>
					</div>
					<div className='answers-arrows'>
						<div className='arrows'>
							<div className='arrow'>
								{currentQuestion != 1 ? <Arrow left onClick={() => setCurrentQuestion(currentQuestion - 1)} /> : <div className='hide'><Arrow left /></div>}
							</div>
							<div className='answers'>
								{answersToDisplay}
							</div>
							<div className='arrow'>
								{currentQuestion != Object.keys(questions).length ? <Arrow right onClick={() => setCurrentQuestion(currentQuestion + 1)} /> : <div className='hide'><Arrow right /></div>}
								{currentQuestion == Object.keys(questions).length && <Button className='submit-answers' onClick={() => console.log(getSkinTypeAccordingToGivenAnswers(answers))}>Submit</Button>}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Questions;