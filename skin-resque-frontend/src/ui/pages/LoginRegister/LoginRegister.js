import { Formik, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';
import Heading from '../../components/Heading/Heading';
import Button from '../../components/Button/Button';
import { createUser } from '../../../ducks/User/actions';
import './LoginRegister.scss'

function LoginRegister({ isLogin, setUser, createUser }) {

	const URL = 'http://localhost:5000/users';

	const navigate = useNavigate();

	const signIn = (values) => {
		axios.post(`${URL}/login`, values).then((response) => {
			if (response.data.passwordCorrect) {
				setUser(values.username);
				Cookies.set('username', values.username);
				Cookies.set('userId', response.data.id);
				Cookies.set('accessToken', response.data.access_token);
				return navigate('/');
			}
			alert('Wrong password provided.');
		})
		.catch((error) => {
			if (error.response.status === 400) {
				return alert('There is no user with given username.');
			}
			return alert('Something went wrong while creating user. Please try again.');
		})
	}

	const signUp = (values) => {
		console.log(values);
		createUser(values);
		//return axios.post(URL, values).then(() => {
		//	alert('Successfully signed up. You can now sign in.');
		//})
		//.catch((error) => {
		//	if (error.response.status === 400) {
		//		return alert('This username or email is already taken.');
		//	}
		//	return alert('Something went wrong while creating user. Please try again.');
		//})
	}

	return (
		<div className='page' style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/login-register.svg')` }}>
			<div className='login-register'>
				<Heading>{isLogin ? 'Sign in' : 'Sign up'}</Heading>
				<div className='form-links'>
					<Formik
						initialValues={
							isLogin
								? {
									username: '',
									password: ''
								}
								: {
									username: '',
									password: '',
									repeatedPassword: '',
									email: ''
								}
						}
						validate={values => {
							const errors = {};
							if (!isLogin && !values.email) {
								errors.email = 'Email is required';
							} else if (
								!isLogin &&
								!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
							) {
								errors.email = 'Invalid email address';
							} else if (!values.username) {
								errors.username = 'Username is required';
							} else if (!values.password) {
								errors.password = 'Password is required';
							}  else if (!isLogin && values.password !== values.repeatedPassword) {
								errors.repeatedPassword = 'Passwords do not match';
							}
							return errors;
						}}
						onSubmit={isLogin ? signIn : signUp}
					>{(formProps) => (
						<form>
							<div className='field'>
								<Heading size='small'>Username</Heading>
								<Field type='text' name='username' />
							</div>
							{formProps.touched.username && formProps.errors.username ? <div>{formProps.errors.username}</div> : null}
							{!isLogin &&
								<><div className='field'>
									<Heading size='small'>Email</Heading>
									<Field type='text' name='email' />
								</div>
									{formProps.touched.email && formProps.errors.email ? <div>{formProps.errors.email}</div> : null}
								</>
							}
							<div className='field'>
								<Heading size='small'>Password</Heading>
								<Field type='password' name='password' />
							</div>
							{formProps.touched.password && formProps.errors.password ? <div>{formProps.errors.password}</div> : null}
							{!isLogin &&
								<><div className='field'>
									<Heading size='small'>Repeat Password</Heading>
									<Field type='password' name='repeatedPassword' />
								</div>
									{formProps.touched.repeatedPassword && formProps.errors.repeatedPassword ? <div>{formProps.errors.repeatedPassword}</div> : null}
								</>}
							<Button onClick={formProps.handleSubmit} size='large'>{isLogin ? 'Sign in' : 'Sign up'}</Button>
						</form>
					)}
					</Formik>
					<div className='links'>
						<Heading size='small'>{isLogin ? "Don't" : 'Already'} have an account? <Link to={isLogin ? '/register' : '/login'}>{isLogin ? 'Sign up' : 'Sign in'} here</Link></Heading>
					</div>
				</div>
			</div>
		</div>
	);
}

const mapDispatchToProps = {
    createUser
};

export default connect(null, mapDispatchToProps)(LoginRegister);

