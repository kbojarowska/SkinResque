import Cookies from 'js-cookie';
import axios from 'axios';
import { useState, useEffect } from 'react'; 
import { Formik, Field } from 'formik';
import { Heading, Text, Button } from '../../../components';
import '../Userpage.scss';

function UserEdit() {
	const URL = 'http://localhost:5000';
	
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
			name: 'Delete profile'
		}
	];

	const [user, setUser] = useState(null);
	const [currentlyChosenOption, setCurrentlyChosenOption] = useState(null);

	const actionsList = actions.map((action) => {
		return (
			<Heading
				size='small'
				key={action.id} 
				className={`action-name ${currentlyChosenOption && currentlyChosenOption.id == action.id ? 'chosen' : null}`}
				onClick={() => setCurrentlyChosenOption(action)}
			>
				{action.name}
			</Heading>);
	});

	useEffect(() => {
		const id = Cookies.get('userId');
		const token = Cookies.get('accessToken');
		axios.get(`${URL}/users/${id}?token=${token}`).then((response) => {
			setUser(response.data);
		})
		.catch(() => {
			alert('Something went wrong while downloading user data.');
		})

	}, []);

	return (
		<div className='page' style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/bg-user-profile.svg')` }}>
			<div className='beige-bg edit'>
				<div className='actions'>
					{actionsList}
				</div>
				<div className='actions-forms'>
						{!currentlyChosenOption && <Text>No option selected</Text>}
						{currentlyChosenOption && 'property' in currentlyChosenOption &&
						<Formik
						initialValues={{
							[currentlyChosenOption.property]: user[currentlyChosenOption.property]
						}}
						onSubmit={(values) => console.log(values)}
					>
						{(formProps) => (
						<form>
							<div className='field'>
								<Heading size='small'>{currentlyChosenOption.display}</Heading>
								<Field type='text' name={currentlyChosenOption.property} value={user[currentlyChosenOption.property]}/>
							</div>
							<Button onClick={formProps.handleSubmit}>{'Submit'}</Button>
						</form>
					)}
					</Formik>}
					{currentlyChosenOption && !('property' in currentlyChosenOption) &&
					<Button>{'Delete profile'}</Button>
					}
				</div>
			</div>
		</div>
	);
};

export default UserEdit;