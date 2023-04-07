import Cookies from 'js-cookie';
import axios from 'axios';
import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Heading, Button } from '../../../components';
import '../Userpage.scss';

function UserEdit( { setCurrentUser }) {

	const navigate = useNavigate();
	const URL = 'http://localhost:5000/users';
	
	const actions = [
		{	
			id: 1,
			name: 'Edit email',
			display: 'Email',
			property: 'email'
		},
		{	
			id: 2,
			name: 'Edit username',
			display: 'Username',
			property: 'name'
		},
		{
			id: 3,
			name: 'Delete profile',
			property: null
		}
	];

	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [currentlyChosenOption, setCurrentlyChosenOption] = useState(actions[0].property);
	const [value, setValue] = useState('');

	const actionsList = actions.map((action) => {
		return (
			<Heading
				size='small'
				key={action.id} 
				className={`action-name ${currentlyChosenOption && currentlyChosenOption == action.property ? 'chosen' : null}`}
				onClick={() => setCurrentlyChosenOption(action.property)}
			>
				{action.name}
			</Heading>);
	});

	const updateUser = (values) => {
		console.log(values);
		//return axios.put(`${URL}/${user._id}?token=${token}`, values).then((response) => {
		//	console.log(response);
		//}).catch((error) => {
		//	console.log(error);
		//})
	}

	const deleteUser = () => {
		return axios.delete(`${URL}/${user._id}?token=${token}`).then(() => {
			Cookies.remove('username');
			Cookies.remove('userId');
			Cookies.remove('accessToken');
			setCurrentUser(null);
			return navigate('/login');
		}).catch(() => {
			alert('Something went wrong while deleting account.');
		})
	}

	useEffect(() => {
		const id = Cookies.get('userId');
		const token = Cookies.get('accessToken');
		setToken(token);
		axios.get(`${URL}/${id}?token=${token}`).then((response) => {
			setUser(response.data);
			setValue(response.data[currentlyChosenOption]);
		})
		.catch((error) => {
			console.log(error);
			alert('Something went wrong while downloading user data.');
		})

	}, []);

	useEffect(() => {
		console.log(currentlyChosenOption);
		user && setValue(user[currentlyChosenOption]);
	}, [currentlyChosenOption]);

	return (
		<div className='page' style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/bg-user-profile.svg')` }}>
			<div className='beige-bg edit'>
				<div className='actions'>
					{actionsList}
				</div>
				<div className='actions-forms'>
						{currentlyChosenOption &&
						<form>
							<div className='field'>
								<Heading size='small'>{actions.find((action) => action.property === currentlyChosenOption).display}</Heading>
								<input
									type='text'
									value={value}
									name={[currentlyChosenOption]}
									onChange={(e) => {
										setValue(e.target.value);
									}}
								/>
							</div>
							<Button onClick={() => updateUser({[currentlyChosenOption]: value})}>Submit</Button>
						</form>}
					{!currentlyChosenOption &&
					<Button onClick={deleteUser}>{'Delete profile'}</Button>
					}
				</div>
			</div>
		</div>
	);
};

export default UserEdit;