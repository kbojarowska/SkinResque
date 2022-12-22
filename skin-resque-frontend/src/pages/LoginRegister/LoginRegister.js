import { Formik, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import Heading from '../../components/Heading/Heading';
import Button from '../../components/Button/Button';
import './LoginRegister.scss'

function LoginRegister({ isLogin }) {

	return (
		<div className='page' style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/images/login-register.svg')` }}>
			<div className='login-register'>
				<Heading>{isLogin ? 'Log in' : 'Sign up'}</Heading>
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
							}
							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								alert(JSON.stringify(values, null, 2));
								setSubmitting(false);
							}, 400);
						}}
					>{(formProps) => (
						<form>
							<div className='field'>
								<Heading size='small'>Username</Heading>
								<Field type='text' name='username' />
							</div>
							<ErrorMessage name='username' component='div' />
							<div className='field'>
								<Heading size='small'>Password</Heading>
								<Field type='password' name='password' />
							</div>
							<ErrorMessage name='password' component='div' />
							{!isLogin && <div className='field'>
								<Heading size='small'>Email</Heading>
								<Field type='text' name='email' />
							</div>}
							{!isLogin && <ErrorMessage name='email' component='div' />}
							<Button onClick={formProps.handleSubmit}>{isLogin ? 'Log in' : 'Sign up'}</Button>
						</form>
					)}
					</Formik>
					<div className='links'>
						<Heading size='small'>{isLogin ? "Don't" : 'Already'} have an account? <Link to={isLogin ? '/register' : '/login'}>{isLogin ? 'Sign up' : 'Log in'} here</Link></Heading>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginRegister;