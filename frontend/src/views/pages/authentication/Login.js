import { Link } from 'react-router-dom';
import * as yup from 'yup';
import {
	Card,
	CardBody,
	CardTitle,
	CardText,
	Form,
	FormGroup,
	Label,
	Input,
	CustomInput,
	Button,
	FormFeedback,
} from 'reactstrap';
import '@styles/base/pages/page-auth.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AdminLoginRequest } from '../../../redux/authSlice';
import { isObjEmpty } from '@utils';

const illustration = 1 ? 'image_main.png' : 'image_main.png',
	source = require(`@src/assets/images/logo/${illustration}`).default;

const Login = () => {
	const SignupSchema = yup.object().shape({
		username: yup.string().required('Email / Phone is required'),
		password: yup
			.string()
			.min(2, 'Password must be at least 2 characters')
			.required('Password is required'),
	});

	// const { register, errors, handleSubmit } = useForm({
	// 	mode: 'onChange',
	// 	resolver: yupResolver(SignupSchema),
	// });
	// const { register, errors, handleSubmit } = useForm();

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state);
	// const { userData, error, abilityData } = useSelector((state) => state.auth);
	console.log(userLogin, 'userLogin');
	const [value, setValue] = useState({
		username: '',
		password: '',
	});

	// const [username, setUserName] = useState('');
	// const [password, setPassword] = useState('');

	// const onClick = () => {
	// 	// e.preventDefault();
	// 	const { username, password } = value;
	// 	const user = { username, password };
	// 	console.log(user, 'user');
	// 	dispatch(AdminLoginRequest(user));
	// };

	const handleSubmit = (e) => {
		e.preventDefault();
		const { username, password } = value;
		const user = { username, password };
		console.log(user, 'user');
		dispatch(AdminLoginRequest(user));
	};
	return (
		<div className="auth-wrapper auth-v1 px-2">
			<div className="auth-inner py-2">
				<Card className="mb-0">
					<CardBody>
						<Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
							<img className="img-fluid" style={{ width: '30px' }} src={source} alt="Login V2" />
							<h2 className="brand-text text-primary ml-1" style={{ margin: '0px' }}>
								Kush Diamond
							</h2>
						</Link>
						<CardTitle tag="h4" className="mb-1">
							Welcome to Kush Diamond!
						</CardTitle>
						<CardText className="mb-2">
							Please sign-in to your account and start the adventure
						</CardText>
						{/* <Form className="auth-login-form mt-2" onClick={(e) => handleSubmit(e)}> */}
						{/* <Form className="auth-login-form mt-2" onClick={handleSubmit(onClick)}> */}
						<Form className="auth-login-form mt-2" onClick={(e) => handleSubmit(e)}>
							<FormGroup>
								<Label className="form-label" for="login-email">
									Email / Mobile No
								</Label>
								<Input
									type="text"
									id="username"
									name="username"
									defaultValue={value.username}
									onChange={(e) => (value['username'] = e.target.value)}
									// value={username}
									// onChange={(e) => setUserName(e.target.value)}
									// innerRef={register({ required: true })}
									// invalid={errors.username && true}
									placeholder="Enter Your Email / Mobile No"
									autoFocus
								/>
								{/* {errors && errors.username && (
									<FormFeedback>{errors.username.message}</FormFeedback>
								)} */}
							</FormGroup>
							<FormGroup>
								<div className="d-flex justify-content-between">
									<Label className="form-label" for="login-password">
										Password
									</Label>
									<Link to="/forgot-password">
										<small>Forgot Password?</small>
									</Link>
								</div>
								<Input
									id="password"
									type="password"
									name="password"
									className="input-group-merge"
									placeholder="Enter Your Password"
									defaultValue={value.password}
									onChange={(e) => (value['password'] = e.target.value)}
									// value={password}
									// onChange={(e) => setPassword(e.target.value)}
									// innerRef={register({ required: true })}
									// invalid={errors.password && true}
								/>
								{/* {errors && errors.password && (
									<FormFeedback>{errors.password.message}</FormFeedback>
								)} */}
							</FormGroup>
							<FormGroup>
								<CustomInput
									type="checkbox"
									className="custom-control-Primary"
									id="remember-me"
									label="Remember Me"
								/>
							</FormGroup>
							<Button.Ripple color="primary" block>
								Sign in
							</Button.Ripple>
						</Form>
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

export default Login;
