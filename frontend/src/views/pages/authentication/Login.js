import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import {
	Card,
	CardBody,
	CardTitle,
	CardText,
	FormGroup,
	Label,
	Input,
	CustomInput,
	Button,
} from 'reactstrap';
import '@styles/base/pages/page-auth.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AdminLoginRequest, handleResetAuth } from '../../../redux/authSlice';
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils';
import { toast, Slide } from 'react-toastify';
import { Fragment } from 'react';
import { useEffect } from 'react';
import InputPasswordToggle from '@components/input-password-toggle';

const illustration = 1 ? 'image_main.png' : 'image_main.png',
	source = require(`@src/assets/images/logo/${illustration}`).default;

const ToastContent = ({ name, role }) => (
	<Fragment>
		<div className="toastify-header">
			<div className="title-wrapper">
				<img className="img-fluid" style={{ width: '30px' }} src={source} alt="Login V2" />
				<h6 className="toast-title font-weight-bold">Welcome, {name}</h6>
			</div>
		</div>
		<div className="toastify-body">
			<span>
				You have successfully logged in as an {role} to Kush Diamond. Now you can start to explore.
				Enjoy!
			</span>
		</div>
	</Fragment>
);

const SignupSchema = yup.object().shape({
	username: yup.string().required('Email / Phone is required'),
	password: yup
		.string()
		.min(3, 'Password must be at least 3 characters')
		.required('Password is required'),
});

const Login = () => {
	// const userlogin = useSelector((state) => state.auth);
	// console.log(userlogin, 'userlogin');
	const { userData, errors, erorr } = useSelector((state) => state.auth);
	// console.log(errors, 'erorrs');
	// console.log(erorr, 'erorr');
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (userData !== null) {
			toast.success(
				<ToastContent name={userData.name || userData.username} role={userData.role} />,
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
									<FormGroup>
										<Label className="form-label" for="login-email">
											Email / Mobile No
										</Label>
										<Field
											type="text"
											id="username"
											name="username"
											className="form-control"
											placeholder="Enter Your Email / Mobile No"
										/>
										{errors.username && touched.username ? (
											<div style={{ color: 'red' }}>{errors.username}</div>
										) : null}
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
										<Field
											id="password"
											type="password"
											name="password"
											className="form-control"
											placeholder="Enter Your Password"
										/>
										{errors.password && touched.password ? (
											<div style={{ color: 'red' }}>{errors.password}</div>
										) : null}
									</FormGroup>

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
