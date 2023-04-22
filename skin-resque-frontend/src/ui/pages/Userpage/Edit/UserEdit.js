import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Heading, Button } from '../../../components';
import { updateUser, deleteUser } from '../../../../ducks/User/actions';
import { getUser } from '../../../../ducks/User/selectors';
import '../Userpage.scss';

function UserEdit({ user, updateUser, deleteUser }) {

	const navigate = useNavigate();

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
			name: 'Edit password',
			display: 'New password',
			property: 'password'
		},
		{
			id: 4,
			name: 'Delete profile',
			property: null
		}
	];

	const [token, setToken] = useState(null);
	const [currentlyChosenOption, setCurrentlyChosenOption] = useState(actions[0].property);
	const [value, setValue] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [repeatNewPassword, setRepeatNewPassword] = useState('');

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

	// const validatePasswordChange = (givenCurrentPassword, newPassword, repeatNewPassword ) => {
	// 	const errors = {};

	// 	if (!givenCurrentPassword) {
	// 		errors.givenCurrentPassword = 'Current password is required';
	// 	} else if (!newPassword) {
	// 		errors.username = 'New password is required';
	// 	} else if (!repeatNewPassword) {
	// 		errors.password = 'Password is required';
	// 	}  else if (newPassword !== repeatNewPassword) {
	// 		errors.repeatedPassword = 'Passwords do not match';
	// 	}

	// 	return errors;
	// };

	useEffect(() => {
		const token = Cookies.get('accessToken');
		setToken(token);
	}, []);

	useEffect(() => {
		user && setValue(currentlyChosenOption !== 'password' ? user[currentlyChosenOption] : '')
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
							{currentlyChosenOption === 'password' &&
								<div className='field'>
									<Heading size='small'>Current password</Heading>
									<input
										type='text'
										value={currentPassword}
										name='currentPassword'
										onChange={(e) => {
											setCurrentPassword(e.target.value);
										}}
									/>
								</div>}
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
							{currentlyChosenOption === 'password' &&
								<div className='field'>
									<Heading size='small'>Repeat new password</Heading>
									<input
										type='text'
										value={repeatNewPassword}
										name={[currentlyChosenOption]}
										onChange={(e) => {
											setRepeatNewPassword(e.target.value);
										}}
									/>
								</div>
							}
							<Button onClick={() => updateUser(user._id, user.token, { [currentlyChosenOption]: value })}>Submit</Button>
						</form>}
					{!currentlyChosenOption &&
						<Button onClick={() => deleteUser(user._id, user.token)}>Delete profile</Button>
					}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		user: getUser(state)
	};
};

const mapDispatchToProps = {
	updateUser,
	deleteUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);