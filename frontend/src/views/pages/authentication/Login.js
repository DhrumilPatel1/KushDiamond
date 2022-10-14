import React, { useContext, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { Card, CardBody, CardTitle, CardText, FormGroup, Label, Button } from 'reactstrap';
import '@styles/base/pages/page-auth.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AdminLoginRequest, handleResetAuth } from '../../../redux/authSlice';
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils';
import { toast, Slide } from 'react-toastify';
import { Fragment } from 'react';
import { useEffect } from 'react';
import InputPasswordToggle from '@components/input-password-toggle';
import { AbilityContext } from '@src/utility/context/Can.js';
import { Eye, EyeOff } from 'react-feather';

const illustration = 1 ? 'image_main.png' : 'image_main.png',
	source = require(`@src/assets/images/logo/${illustration}`).default;

// const ToastContent = ({ name, role }) => (
// 	<Fragment>
// 		<div className="toastify-header">
// 			<div className="title-wrapper">
// 				<img className="img-fluid" style={{ width: '30px' }} src={source} alt="Login V2" />
// 				<h6 className="toast-title font-weight-bold">Welcome, {name}</h6>
// 			</div>
// 		</div>
// 		<div className="toastify-body">
// 			<span>
// 				You have successfully logged in as an {name} to Kush Diamond. Now you can start to explore.
// 				Enjoy!
// 			</span>
// 		</div>
// 	</Fragment>
// );

const SignupSchema = yup.object().shape({
	username: yup.string().required('Email or Mobile No is required'),
	password: yup
		.string()
		.min(3, 'Password must be at least 3 characters')
		.required('Password is required'),
});

const Login = () => {
	const [passTextChange, setpassTextChange] = useState(false);
	const { userData, error, abilityData } = useSelector((state) => state.auth);
	const ability = useContext(AbilityContext);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (userData !== null) {
			// toast.success(
			// 	<ToastContent name={userData.name || userData.username} role={userData.role} />,
			// 	{
			// 		transition: Slide,
			// 		hideProgressBar: true,
			// 		autoClose: 2000,
			// 	}
			// );
			ability.update(abilityData);
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
						<Formik
							initialValues={{
								username: '',
								password: '',
							}}
							validationSchema={SignupSchema}
							onSubmit={(values) => {
								dispatch(AdminLoginRequest(values));
							}}
						>
							{({ errors, touched }) => (
								<Form className="auth-login-form mt-2">
									<div>
										<FormGroup>
											<Label className="form-label" for="login-email">
												Email or Mobile No
											</Label>
											<Field
												type="text"
												id="username"
												name="username"
												className="form-control"
												placeholder="Enter Your Email or Mobile No"
											/>
										</FormGroup>
									</div>
									{(errors.username && touched.username) || (error && error.username) ? (
										<div className="error-reset-sm">{errors.username || error.username}</div>
									) : null}
									<div style={{ position: 'relative' }}>
										<FormGroup>
											<div className="d-flex justify-content-between">
												<Label className="form-label" for="login-password">
													Password
												</Label>
												<Link to="/forgot-password">
													<small>Forgot Password?</small>
												</Link>
											</div>
											<Field
												id="password"
												type={passTextChange == true ? 'text' : 'password'}
												name="password"
												className="form-control"
												placeholder="Enter Your Password"
											/>
											{passTextChange === true ? (
												<EyeOff
													className="password_login_pass"
													onClick={() => setpassTextChange(!passTextChange)}
												/>
											) : (
												<Eye
													className="password_login_pass"
													onClick={() => setpassTextChange(!passTextChange)}
												/>
											)}
										</FormGroup>
									</div>
									{(errors.password && touched.password) || (error && error.password) ? (
										<div className="error-reset-sm">{errors.password || error.password}</div>
									) : null}

									<Button.Ripple type="submit" color="primary" block>
										Sign in
									</Button.Ripple>
								</Form>
							)}
						</Formik>
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

export default Login;
