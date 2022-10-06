import React, { useEffect } from 'react';
import { CardBody, FormGroup, Row, Col, Button, Label, Card } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumbs from '@components/breadcrumbs';
import { UserCreateRequest, userResetAuth } from '../../../redux/userSlice';

const FtpCreateSchema = yup.object().shape({
	staff_name: yup.string().required('Username is required'),
	email: yup.string().email('Invalid email').required('Email is required'),
	mobile_no: yup.number().required('Mobile No is required'),
	password: yup
		.string()
		.required('Password is required')
		.min(8, 'Must be 8 characters or more')
		.matches(/[@$!%*#?&]+/, 'One special character'),
});

const CreateUser = () => {
	const { userCreateData, error } = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (userCreateData && userCreateData.length !== 0) {
			history.push('/user/list');
		}
		return () => {
			dispatch(userResetAuth());
		};
	}, [userCreateData]);

	return (
		<>
			<Breadcrumbs
				breadCrumbTitle="User Create"
				breadCrumbParent="User"
				breadCrumbActive="Create"
			/>
			<Card>
				<CardBody>
					<Formik
						initialValues={{
							staff_name: '',
							email: '',
							mobile_no: '',
							password: '',
						}}
						validationSchema={FtpCreateSchema}
						onSubmit={(values) => {
							dispatch(UserCreateRequest(values));
						}}
					>
						{({ errors, touched }) => (
							<Form>
								<Row>
									<Col md="6" sm="12">
										<FormGroup>
											<Label for="staff_name">User Name</Label>
											<Field
												type="text"
												name="staff_name"
												id="staff_name"
												autoComplete="off"
												className="form-control"
												placeholder="Enter Your User Name"
											/>
											{(errors.username && touched.username) || (error && error.username) ? (
												<div className="error-sm">{errors.username || error.username}</div>
											) : null}
										</FormGroup>
									</Col>

									<Col md="6" sm="12">
										<FormGroup>
											<Label for="email">Email</Label>
											<Field
												type="email"
												name="email"
												id="email"
												autoComplete="off"
												className="form-control"
												placeholder="Enter Your Email"
											/>

											{(errors.email && touched.email) || (error && error.email) ? (
												<div className="error-sm">{errors.email || error.email}</div>
											) : null}
										</FormGroup>
									</Col>
									<Col md="6" sm="12">
										<FormGroup>
											<Label for="mobile_no">Mobile No</Label>
											<Field
												type="number"
												name="mobile_no"
												id="mobile_no"
												className="form-control"
												placeholder="Enter Your Mobile No"
											/>

											{(errors.mobile_no && touched.mobile_no) || (error && error.mobile_no) ? (
												<div className="error-sm">{errors.mobile_no || error.mobile_no}</div>
											) : null}
										</FormGroup>
									</Col>
									<Col md="6" sm="12">
										<FormGroup>
											<Label for="password">Password</Label>
											<Field
												type="password"
												name="password"
												id="password"
												className="form-control"
												placeholder="Enter Your Password"
											/>
											{(errors.password && touched.password) || (error && error.password) ? (
												<div className="error-sm">{errors.password || error.password}</div>
											) : null}
										</FormGroup>
									</Col>

									<Col sm="12">
										<FormGroup className="d-flex mb-0">
											<Button.Ripple size="sm" className="mr-1" color="primary" type="submit">
												Submit
											</Button.Ripple>
											<Button.Ripple size="sm" color="secondary" tag={Link} to="/user/list" outline>
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

export default CreateUser;
