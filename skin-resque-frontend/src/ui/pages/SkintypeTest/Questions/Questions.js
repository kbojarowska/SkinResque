<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
=======
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
>>>>>>> 47f20641fbb063d6c80760a841b0db225c5a9a97
import { Arrow, Button, Checkbox, Heading } from '../../../components';
import './Questions.scss';

function Questions() {
	const navigate = useNavigate();
	const URL = 'http://localhost:5000';
	const [questions, setQuestions] = useState([
		{
			'id': 1,
			'question': 'Does your skin feel tight and dry after washing your face?',
			'answers': [
				{
					'id': '1-a',
					'answer': 'Yes, my whole skin feel like it',
					'type': 'dry',
					'checked': false
				},
				{
					'id': '1-b',
					'answer': 'Only on cheeks',
					'type': 'mixed',
					'checked': false
				},
				{
					'id': '1-c',
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
					'id': '2-a',
					'answer': 'No',
					'type': ['normal'],
					'checked': false
				},
				{
					'id': '2-b',
					'answer': 'Yes',
					'type': ['oily', 'dry', 'mixed'],
					'checked': false
				}
			]
		},
		{
			'id': 3,
			'question': 'Do you have a lot of imprefections?',
			'answers': [
				{
					'id': '3-a',
					'answer': 'No, I rarely have any imperfection on my skin',
					'type': ['dry', 'normal'],
					'checked': false
				},
				{
					'id': '3-b',
					'answer': 'Yes, but only in T-zone',
					'type': 'mixed',
					'checked': false
				},
				{
					'id': '3-c',
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
					'id': '4-a',
					'answer': 'No, my skin is rather dull',
					'type': ['dry', 'normal'],
					'checked': false
				},
				{
					'id': '4-b',
					'answer': 'Yes, but only in T-zone',
					'type': 'mixed',
					'checked': false
				},
				{
					'id': '4-c',
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
					'id': '5-a',
					'answer': 'Yes, it does happen sometimes',
					'type': 'dry',
					'checked': false
				},
				{
					'id': '5-b',
					'answer': 'Yes, but only on my cheeks',
					'type': 'mixed',
					'checked': false
				},
				{
					'id': '5-c',
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
					'id': '6-a',
					'answer': 'Yes, it does happen sometimes',
					'type': 'dry',
					'checked': false
				},
				{
					'id': '6-b',
					'answer': 'Yes, but only on my cheeks',
					'type': 'mixed',
					'checked': false
				},
				{
					'id': '6-c',
					'answer': 'No, not really',
					'type': 'normal',
					'checked': false
				},
				{
					'id': '6-d',
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
					'id': '7-a',
					'answer': 'They are hardly visible',
					'type': ['dry', 'normal'],
					'checked': false
				},
				{
					'id': '7-b',
					'answer': 'They are very visible',
					'type': 'oily',
					'checked': false
				},
				{
					'id': '7-c',
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
					'id': '8-a',
					'answer': 'Very',
					'type': 'dry',
					'checked': false
				},
				{
					'id': '8-b',
					'answer': 'Not really',
					'type': 'mixed',
					'checked': false
				},
				{
					'id': '8-c',
					'answer': "I can't really tell",
					'type': '',
					'checked': false
				},
			]
		},
	]);
<<<<<<< HEAD
	const [userId, setUserId] = useState(null);
	const [currentQuestion, setCurrentQuestion] = useState(1);
	const [skinTypeResult, setSkinTypeResult] = useState(null);

		
	useEffect(() => {
		setUserId(Cookies.get('userId'));
	}, []);
=======

	const navigate = useNavigate();
	const [currentQuestion, setCurrentQuestion] = useState(1);
	const [skinTypeResult, setSkinTypeResult] = useState(null);

	const checkIfAllQuestionsAnswered = () => {
		const numberOfQuestions = questions.length;
		const questionsAnswered = questions.filter((question) => {
			return question.answers.some((answer) => answer.checked);
		}).length;

		if (numberOfQuestions !== questionsAnswered) {
			return false;
		}
		return true;
	}

	const checkIfQuestionAlreadyAnswered = (answertoChange) => {
		const questionId = answertoChange.id.split('-')[0];
		const questionAlreadyAnswered = questions.filter((question) => question.id == questionId)[0].answers.some((answer) => answer.checked);
		return questionAlreadyAnswered;
	}
>>>>>>> 47f20641fbb063d6c80760a841b0db225c5a9a97

	const handleCheckAnswer = (answertoChange) => {
		const questionAlreadyAnswered = checkIfQuestionAlreadyAnswered(answertoChange);
		const questionsToSet = questions.map((question) => {
			const answersToSet = question.answers.map((answer) => {
				if (answer.id == answertoChange.id) {
					answer.checked = !answer.checked;
				} else if (answer.id != answertoChange.id && questionAlreadyAnswered) {
					answer.checked = false;
				}
				return answer;
			})
			questions.answers = answersToSet;
			return question;
		})

		setQuestions(questionsToSet);
		setSkinTypeForUser(questions);
	};

	const getSkinTypeAccordingToGivenAnswers = (questions) => {
		let answers = [];
		questions.forEach((question) => {
			for (let answer in question.answers) {
				if (question.answers[answer].checked) {
					if (Array.isArray(question.answers[answer].type)) {
						for (let index in question.answers[answer].type) {
							answers = [...answers, question.answers[answer].type[index]];
						}
					}
					else {
						answers = [...answers, question.answers[answer].type];
					}
				}
			}
		})

		return answers.sort((a, b) =>
			answers.filter(v => v === a).length
			- answers.filter(v => v === b).length
		).pop();
	};

	const setSkinTypeForUser = (questions) => {
		const skinType = getSkinTypeAccordingToGivenAnswers(questions);
		setSkinTypeResult(skinType);
	};

<<<<<<< HEAD
	const submitAnswers = () => {
		if (userId) {
			const token = Cookies.get('accessToken');
			axios.put(`${URL}/users/${userId}?token=${token}`, {skinType: skinTypeResult}).catch(() => {
				alert('Something went wrong while saving skin type to profile.');
			})
		}
		return navigate(`/skintype-test/results/${skinTypeResult}`);
=======
	const handleSubmitAnswers = () => {
		const allQuestionsAnswered = checkIfAllQuestionsAnswered();

		if (allQuestionsAnswered) {
			return navigate(`/skintype-test/results/${skinTypeResult}`);
		}
		alert('You need to answer all of the questions');
>>>>>>> 47f20641fbb063d6c80760a841b0db225c5a9a97
	}

	const answersToDisplay = questions.filter((question) => {
		return question.id == currentQuestion
	})[0].answers.map((answer) => {
		return (
			<div className='answer' key={answer.id}>
				<Checkbox checked={answer.checked} onClick={() => { handleCheckAnswer(answer) }}>{answer.answer}</Checkbox>
			</div>
		)
	});

	const questionToDisplay = questions.filter((question) => {
		return question.id == currentQuestion
	})[0].question;

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
<<<<<<< HEAD
								{currentQuestion == Object.keys(questions).length && <Button className='submit-answers' onClick={submitAnswers}>Submit</Button>}
=======
								{currentQuestion == Object.keys(questions).length && <Button className='submit-answers' onClick={handleSubmitAnswers}>Submit</Button>}
>>>>>>> 47f20641fbb063d6c80760a841b0db225c5a9a97
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Questions;