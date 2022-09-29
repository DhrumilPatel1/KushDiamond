import { Link } from 'react-router-dom';
import { useSkin } from '@hooks/useSkin';
import { ChevronLeft } from 'react-feather';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import {
	Card,
	CardBody,
	CardTitle,
	CardText,
	FormGroup,
	Label,
	Input,
	Button,
	Row,
	Col,
} from 'reactstrap';
import '@styles/base/pages/page-auth.scss';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ForgotPasswordLinkRequest } from '../../../redux/ForgotPasswordSlice';
import { useDispatch, useSelector } from 'react-redux';

const ForgotPassword = () => {
	const [skin, setSkin] = useSkin();
	const dispatch = useDispatch();

	const illustration = skin === 'dark' ? 'image_main.png' : 'image_main.png',
		source = require(`@src/assets/images/logo/${illustration}`).default;

	const ForgotPasswordSchema = yup.object().shape({
		email: yup.string().required('Email is required'),
	});

	const { forgotPasswordData, error } = useSelector((state) => state.forgotPassword);
	console.log(forgotPasswordData, 'forgotPasswordData');
	console.log(error, 'error');

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
							Forgot Password? 🔒
						</CardTitle>
						<CardText className="mb-2">
							Enter your email and we'll send you instructions to reset your password
						</CardText>
						{/* <Form className="auth-forgot-password-form mt-2" onClick={handleSubmit(onClick)}> */}
						{/* <Form className="auth-forgot-password-form mt-2">
							<FormGroup>
								<Label for="email">Email</Label>
								<Input
									id="email"
									type="email"
									name="email"
									// innerRef={register({ required: true })}
									// invalid={errors.email && true}
									// defaultValue={value.email}
									// onChange={(e) => (value['email'] = e.target.value)}
									placeholder="john@example.com"
								/>
							</FormGroup>
							<Button.Ripple color="primary" block>
								Send reset link
							</Button.Ripple>
						</Form> */}
						<Formik
							initialValues={{
								email: '',
							}}
							validationSchema={ForgotPasswordSchema}
							onSubmit={(values) => {
								console.log(values, 'values');
								dispatch(ForgotPasswordLinkRequest(values));
							}}
						>
							{({ errors, touched }) => (
								<Form className="auth-forgot-password-form mt-2">
									<FormGroup>
										<Label for="email">Email</Label>
										<Field
											type="text"
											name="email"
											id="email"
											className="form-control"
											placeholder="Enter Your Email"
										/>
										{errors && errors.email && touched.email ? (
											<div className="error-sm">{errors.email}</div>
										) : null}
									</FormGroup>
									<Button.Ripple color="primary" type="submit" block>
										Send reset link
									</Button.Ripple>
								</Form>
							)}
						</Formik>
						<p className="text-center mt-2">
							<Link to="/">
								<ChevronLeft className="mr-25" size={14} />
								<span className="align-middle">Back to login</span>
							</Link>
						</p>
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

export default ForgotPassword;
