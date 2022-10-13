import React, { useEffect, useState } from 'react';
import { CardBody, FormGroup, Row, Col, Button, Label, Card } from 'reactstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumbs from '@components/breadcrumbs';
import { UserViewRequest } from '../../../../redux/userSlice';
const UserCreateSchema = yup.object().shape({
	staff_name: yup.string().required('Username is required'),
	mobile_no: yup.number().required('Mobile No is required'),
});

const EditUser = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { id } = useParams();
	const { userViewData, error } = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(UserViewRequest(id));
	}, []);

	// useEffect(() => {
	// 	if (userCreateData && userCreateData.length !== 0) {
	// 		history.push('/user/list');
	// 	}
	// 	return () => {
	// 		dispatch(userResetAuth());
	// 	};
	// }, [userCreateData]);

	const [values, setValues] = useState('');

	const onInputChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		setValues({
			staff_name: userViewData && userViewData.staff_name,
			mobile_no: userViewData && userViewData.mobile_no,
			email: userViewData && userViewData.email,
			password: userViewData && userViewData.password,
		});
	}, [userViewData]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const { staff_name, mobile_no, email, password } = values;
		const updateUserData = {
			staff_name,
			mobile_no,
			email,
			password,
		};
		// console.log(updateUserData, 'updateFtpData');

		// dispatch(FtpUpdateList(id, updateFtpData));
	};

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
						validationSchema={UserCreateSchema}
						onSubmit={(values) => {
							// dispatch(UserCreateRequest(values));
						}}
					>
						{({ errors, touched }) => (
							<Form onSubmit={(e) => handleSubmit(e)}>
								<Row>
									<Col md="6" sm="12">
										<FormGroup>
											<Label for="staff_name">User Name</Label>
											<Field
												type="text"
												name="staff_name"
												id="staff_name"
												className="form-control"
												placeholder="Enter Your User Name"
												value={values.staff_name}
												onChange={(e) => onInputChange(e)}
											/>
											{(errors.staff_name && touched.staff_name) || (error && error.staff_name) ? (
												<div className="error-sm">{errors.staff_name || error.staff_name}</div>
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
												disabled
												className="form-control"
												placeholder="Enter Your Email"
												value={values.email}
												onChange={(e) => onInputChange(e)}
											/>

											{/* {(errors.email && touched.email) || (error && error.email) ? (
												<div className="error-sm">{errors.email || error.email}</div>
											) : null} */}
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

											{/* {(errors.mobile_no && touched.mobile_no) || (error && error.mobile_no) ? (
												<div className="error-sm">{errors.mobile_no || error.mobile_no}</div>
											) : null} */}
										</FormGroup>
									</Col>
									<Col md="6" sm="12">
										<FormGroup>
											<Label for="password">Password</Label>
											<Field
												type="password"
												name="password"
												id="password"
												disabled
												className="form-control"
												placeholder="Enter Your Password"
												value={values.password}
												onChange={(e) => onInputChange(e)}
											/>
											   
											{/* {(errors.password && touched.password) || (error && error.password) ? (
												<div className="error-sm">{errors.password || error.password}</div>
											) : null} */}
										</FormGroup>
									</Col>

									<Col sm="12">
										<FormGroup className="d-flex mb-0">
											<Button.Ripple size="sm" className="mr-1" color="primary" type="submit">
												Update
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
