import React, { useEffect } from 'react';
import { CardBody, FormGroup, Row, Col, Button, Label, Card } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { FtpCreateRequest, ftpResetAuth } from '../../../redux/FtpsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumbs from '@components/breadcrumbs';

const FtpCreateSchema = yup.object().shape({
	client_name: yup.string().required('Client Name is required'),
	protocol: yup.string().required('Protocol is required'),
	port: yup.number().required('Port is required'),
});

const CreateUser = () => {
	const { ftpCreateData, error } = useSelector((state) => state.Ftps);

	const dispatch = useDispatch();
	const history = useHistory();

	// useEffect(() => {
	// 	if (ftpCreateData && ftpCreateData.length !== 0) {
	// 		history.push('/ftp/list');
	// 	}
	// 	return () => {
	// 		dispatch(ftpResetAuth());
	// 	};
	// }, [ftpCreateData]);

	return (
		<>
			<Breadcrumbs breadCrumbTitle="FTP Create" breadCrumbParent="Ftp" breadCrumbActive="Create" />
			<Card>
				<CardBody>
					<Formik
						initialValues={{
							client_name: '',
							password: '',
							
						}}
						validationSchema={FtpCreateSchema}
						onSubmit={(values) => {
							dispatch(FtpCreateRequest(values));
						}}
					>
						{({ errors, touched }) => (
							<Form>
								<Row>
									<Col md="6" sm="12">
										<FormGroup>
											<Label for="client_name">Client Name</Label>
											<Field
												type="text"
												name="client_name"
												id="client_name"
												className="form-control"
												placeholder="Enter Your Client Name"
											/>
											{/* {(errors.client_name && touched.client_name) ||
											(error && error.client_name) ? (
												<div className="error-sm">{errors.client_name || error.client_name}</div>
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
												autoComplete="new-password"
												className="form-control"
												placeholder="Enter Your Password"
											/>
											{/* {(errors.password && touched.password) || (error && error.password) ? (
												<div className="error-sm">{errors.password || error.password}</div>
											) : null} */}
										</FormGroup>
									</Col>

									<Col sm="12">
										<FormGroup className="d-flex mb-0">
											<Button.Ripple size="sm" className="mr-1" color="primary" type="submit">
												Submit
											</Button.Ripple>
											<Button.Ripple size="sm" color="secondary" tag={Link} to="/ftp/list" outline>
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
