import React, { useEffect, useState } from 'react';
import { CardBody, FormGroup, Row, Col, Button, Label, Card } from 'reactstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumbs from '@components/breadcrumbs';
import { userResetAuth, UserUpdateListRequest, UserViewRequest } from '../../../../redux/userSlice';

const EditUser = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { id } = useParams();
	const { userUpdateData, error } = useSelector((state) => state.user);

	const { userViewData } = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(UserViewRequest(id));
	}, []);

	useEffect(() => {
		if (userUpdateData && userUpdateData.length !== 0) {
			history.push('/user/list');
		}
		return () => {
			dispatch(userResetAuth());
		};
	}, [userUpdateData]);

	const [values, setValues] = useState('');

	const onInputChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		setValues({
			username: userViewData && userViewData.username,
			mobile_no: userViewData && userViewData.mobile_no,
			email: userViewData && userViewData.email,
		});
	}, [userViewData]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const { username, mobile_no, email } = values;
		const updateUserData = {
			username,
			mobile_no,
			email,
		};
		dispatch(UserUpdateListRequest(id, updateUserData));
	};

	return (
		<>
			<Breadcrumbs
				breadCrumbTitle="User Update"
				breadCrumbParent="User"
				breadCrumbActive="Update"
			/>
			<Card>
				<CardBody>
					<Formik
						initialValues={{
							username: '',
							email: '',
							mobile_no: '',
						}}
					>
						{({ errors, touched }) => (
							<Form onSubmit={(e) => handleSubmit(e)}>
								<Row>
									<Col md="6" sm="12">
										<FormGroup>
											<Label for="username">User Name</Label>
											<Field
												type="text"
												name="username"
												id="username"
												className="form-control"
												placeholder="Enter Your User Name"
												value={values.username}
												onChange={(e) => onInputChange(e)}
											/>

											{error && error.username && touched.username ? (
												<div className="error-sm">{error.username}</div>
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
												className="form-control"
												placeholder="Enter Your Email"
												value={values.email}
												onChange={(e) => onInputChange(e)}
											/>

											{error && error.email && touched.email ? (
												<div className="error-sm">{error.email}</div>
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
												value={values.mobile_no}
												onChange={(e) => onInputChange(e)}
											/>

											{error && error.mobile_no && touched.mobile_no ? (
												<div className="error-sm">{error.mobile_no}</div>
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

export default EditUser;
