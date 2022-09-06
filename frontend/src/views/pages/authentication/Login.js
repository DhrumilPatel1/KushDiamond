import { Link, useHistory } from 'react-router-dom';
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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AdminLoginRequest, handleResetAuth } from '../../../redux/authSlice';
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils';
import { toast, Slide } from 'react-toastify';
import Avatar from '@components/avatar';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { Coffee } from 'react-feather';

const ToastContent = ({ name, role }) => (
	<Fragment>
		<div className="toastify-header">
			<div className="title-wrapper">
				<Avatar size="sm" color="success" icon={<Coffee size={12} />} />
				<h6 className="toast-title font-weight-bold">Welcome, {name}</h6>
			</div>
		</div>
		<div className="toastify-body">
			<span>
				You have successfully logged in as an {role} user to Vuexy. Now you can start to explore.
				Enjoy!
			</span>
		</div>
	</Fragment>
);

const illustration = 1 ? 'image_main.png' : 'image_main.png',
	source = require(`@src/assets/images/logo/${illustration}`).default;

const Login = () => {
	const { userData } = useSelector((state) => state.auth);

	const { register, errors, handleSubmit } = useForm();
	const dispatch = useDispatch();
	const history = useHistory();
	const [value, setValue] = useState({
		username: '',
		password: '',
	});

	const onClick = () => {
		const { username, password } = value;
		const user = { username, password };
		dispatch(AdminLoginRequest(user));
	};

	useEffect(() => {
		if (userData !== null) {
			toast.success(
				<ToastContent
					name={userData.name || userData.username || 'John Doe'}
					role={userData.role || 'client'}
				/>,
				{
					transition: Slide,
					hideProgressBar: true,
					autoClose: 2000,
				}
			);
			setTimeout(() => {
				history.push(getHomeRouteForLoggedInUser(userData.role));
			}, 100);
		}
		return () => {
			dispatch(handleResetAuth());
		};
	}, [userData]);
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
						<Form className="auth-login-form mt-2" onClick={handleSubmit(onClick)}>
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
