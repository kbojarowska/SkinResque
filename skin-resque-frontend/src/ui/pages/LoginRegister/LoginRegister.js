import { Formik, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Heading, Text, Button } from '../../components';
import { createUser, loginUser } from '../../../ducks/User/actions';
import './LoginRegister.scss'

function LoginRegister({ isLogin, createUser, loginUser }) {

	const navigate = useNavigate();

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
							} if (
								!isLogin &&
								!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
							) {
								errors.email = 'Invalid email address';
							} if (!values.username) {
								errors.username = 'Username is required';
							} if (!values.password) {
								errors.password = 'Password is required';
							} if (!isLogin && values.password !== values.repeatedPassword) {
								errors.repeatedPassword = 'Passwords do not match';
							}
							return errors;
						}}
						onSubmit={isLogin ? (values) => loginUser(values, navigate) : createUser}
					>{(formProps) => (
						<form>
							<div className='field'>
								<Heading size='small'>Username</Heading>
								<Field type='text' name='username' />
							</div>
							{formProps.touched.username && formProps.errors.username ? <Text size='x-small'>{formProps.errors.username}</Text> : null}
							{!isLogin &&
								<><div className='field'>
									<Heading size='small'>Email</Heading>
									<Field type='text' name='email' />
								</div>
									{formProps.touched.email && formProps.errors.email ? <Text size='x-small'>{formProps.errors.email}</Text> : null}
								</>
							}
							<div className='field'>
								<Heading size='small'>Password</Heading>
								<Field type='password' name='password' />
							</div>
							{formProps.touched.password && formProps.errors.password ? <Text size='x-small'>{formProps.errors.password}</Text> : null}
							{!isLogin &&
								<><div className='field'>
									<Heading size='small'>Repeat Password</Heading>
									<Field type='password' name='repeatedPassword' />
								</div>
									{formProps.touched.repeatedPassword && formProps.errors.repeatedPassword ? <Text size='x-small'>{formProps.errors.repeatedPassword}</Text> : null}
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
	loginUser,
    createUser
};

export default connect(null, mapDispatchToProps)(LoginRegister);

