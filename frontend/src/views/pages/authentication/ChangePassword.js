import React, { useEffect } from 'react';
import { CardBody, FormGroup, Row, Col, Button, Label, Card } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumbs from '@components/breadcrumbs';
import { ChangePasswordRequest } from '../../../redux/ChagePasswordSlice';

const ChangePasswordSchema = yup.object().shape({
	old_password: yup.string().required('Old password is required'),
	new_password: yup
		.string()
		.required('New password is required')
		.min(8, 'Must be 8 characters or more')
		.matches(/[@$!%*#?&]+/, 'One special character'),
	confirmPassword: yup
		.string()
		.required('Confirm password is required')
		.oneOf([yup.ref('new_password'), null], 'New password does not match'),
});

const ChangePassword = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { changePasswordData, error } = useSelector((state) => state.changePassword);

	useEffect(() => {
		if (changePasswordData.statusCode == 200) {
			history.push('/dashboard');
		}
	}, [changePasswordData]);
	// useEffect(()=>{
	// 	if()
	// },[changePasswordData])

	return (
		<>
			<Breadcrumbs
				breadCrumbTitle="Change Password"
				breadCrumbParent="Account"
				breadCrumbActive="Change Password"
			/>
			<Card>
				<CardBody>
					<Formik
						initialValues={{
							old_password: '',
							new_password: '',
							confirmPassword: '',
						}}
						validationSchema={ChangePasswordSchema}
						onSubmit={(values) => {
							// console.log(values, 'values');
							 dispatch(ChangePasswordRequest(values));
						}}
					>
						{({ errors, touched }) => (
							<Form>
								<Row>
									<Col md="6" sm="12">
										<FormGroup>
											<Label for="old_password">Old Password</Label>
											<Field
												type="password"
												name="old_password"
												id="old_password"
												className="form-control"
												placeholder="Enter Your Old Password"
											/>
											{(errors.old_password && touched.old_password) || error?.old_password ? (
												<div className="error-sm">{errors.old_password || error?.old_password}</div>
											) : null}
										</FormGroup>
									</Col>

									<Col md="6" sm="12">
										<FormGroup>
											<Label for="new_password">New Password</Label>
											<Field
												type="password"
												name="new_password"
												id="new_password"
												className="form-control"
												placeholder="Enter Your New Password"
											/>
											{errors.new_password && touched.new_password ? (
												<div className="error-sm">{errors.new_password}</div>
											) : null}
										</FormGroup>
									</Col>

									<Col md="6" sm="12">
										<FormGroup>
											<Label for="confirmPassword">Confirm Password</Label>
											<Field
												type="password"
												name="confirmPassword"
												id="confirmPassword"
												className="form-control"
												placeholder="Enter Your Confirm Password"
											/>
											{errors.confirmPassword && touched.confirmPassword ? (
												<div className="error-sm">{errors.confirmPassword}</div>
											) : null}
										</FormGroup>
									</Col>
									<Col sm="12">
										<FormGroup className="d-flex mb-0">
											<Button.Ripple size="sm" className="mr-1" color="primary" type="submit">
												Submit
											</Button.Ripple>
											<Button.Ripple size="sm" color="secondary" tag={Link} to="/dashboard" outline>
												Back
											</Button.Ripple>
										</FormGroup>
									</Col>
								</Row>
							</Form>
						)}
					</Formik>
				</CardBody>
			</Card>
		</>
	);
};

export default ChangePassword;
