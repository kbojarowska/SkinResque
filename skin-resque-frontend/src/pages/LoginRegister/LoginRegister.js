import { Formik, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Heading from '../../components/Heading/Heading';
import Button from '../../components/Button/Button';
import './LoginRegister.scss'

function LoginRegister({ isLogin, users, setUser, setUsers }) {

	const navigate = useNavigate();

	const logIn = (values) => {
		const user = users.find((user) => {
			return user.username == values.username;
		});

		if (user) {
			if (user.password == values.password) {
				setUser(values.username);
				Cookies.set('username', user.username);
				return navigate('/');
			}
			return alert('Wrong password provided');
		}

		return alert('There is no user with given username');
	}

	const signUp = (values) => {
		if (users.find((user) => {
			return user.username == values.username;
		})) {
			return alert('This username is already taken');
		}
		
		const newUsers = [ ...users, {
			username: values.username,
			email: values.email,
			password: values.password
		}]

		setUsers(newUsers);

		return alert('Succesfully signed up. You can now sign in');
	}

	return (
		<div className='page' style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/login-register.svg')` }}>
			<div className='login-register'>
				<Heading>{isLogin ? 'Sign in' : 'Sign up'}</Heading>
				<div className='form-links'>
					<Formik
						initialValues={
							isLogin ?
								{
									username: '',
									password: ''
								}
								:
								{
									username: '',
									password: '',
									repeatPassword: '',
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
							} else if (values.password !== values.repeatPassword) {
								errors.repeatPassword = 'Passwords do not match';
							}
							return errors;
						}}
						onSubmit={isLogin ? logIn : signUp}
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
								<Heading size='small'>Password</Heading>
								<Field type='text' name='repeatPassword' />
							</div>
							{formProps.touched.repeatPassword && formProps.errors.repeatPassword ? <div>{formProps.errors.repeatPassword}</div> : null}
							</>}
							<Button onClick={formProps.handleSubmit}>{isLogin ? 'Sign in' : 'Sign up'}</Button>
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

export default LoginRegister;