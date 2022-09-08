import React, { useEffect } from 'react';
import { CardBody, FormGroup, Row, Col, Button, Label, Card } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { FtpCreateRequest, ftpResetAuth } from '../../../redux/FtpsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Slide, toast } from 'react-toastify';
import Breadcrumbs from '@components/breadcrumbs';

const FtpCreateSchema = yup.object().shape({
	client_name: yup.string().required('Client Name is required'),
	protocol: yup.string().required('Protocol is required'),
	port: yup.number().min(2, 'Port must be at least 2 characters').required('Port is required'),
	hostname: yup.string().required('Hostname is required'),
	username: yup.string().required('Username is required'),
	password: yup
		.string()
		.min(8, 'Password must be at least 8 characters')
		.required('Password is required'),
	folder_path: yup.string().required('Folder Path is required'),
});

const CreateFtp = () => {
	const { ftpCreateData, error } = useSelector((state) => state.Ftps);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (ftpCreateData !== null) {
			toast.success('Account successfully created');
			history.push('/ftp/list');
		}
		return () => {
			dispatch(ftpResetAuth());
		};
	}, [ftpCreateData]);

	return (
		<>
			<Breadcrumbs
				breadCrumbTitle="FTP Create"
				breadCrumbParent="Ftp"
				breadCrumbActive="Create"
			/>
			<Card>
				<CardBody>
					<Formik
						initialValues={{
							client_name: '',
							protocol: '',
							port: '',
							hostname: '',
							username: '',
							password: '',
							folder_path: '',
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
											{(errors.client_name && touched.client_name) ||
											(error && error.client_name) ? (
												<div className="error-sm">{errors.client_name || error.client_name}</div>
											) : null}
										</FormGroup>
									</Col>
									<Col md="6" sm="12">
										<FormGroup>
											<Label for="protocol">Protocol</Label>
											<Field
												type="text"
												name="protocol"
												id="protocol"
												className="form-control"
												placeholder="Enter Your Protocol"
											/>
											{(errors.protocol && touched.protocol) || (error && error.protocol) ? (
												<div className="error-sm">{errors.protocol || error.protocol}</div>
											) : null}
										</FormGroup>
									</Col>
									<Col md="6" sm="12">
										<FormGroup>
											<Label for="port">Port</Label>
											<Field
												type="number"
												name="port"
												id="port"
												className="form-control"
												placeholder="Enter Your Port"
											/>

											{(errors.port && touched.port) || (error && error.port) ? (
												<div className="error-sm">{errors.port || error.port}</div>
											) : null}
										</FormGroup>
									</Col>
									<Col md="6" sm="12">
										<FormGroup>
											<Label for="hostname">Hostname</Label>
											<Field
												type="text"
												name="hostname"
												id="hostname"
												className="form-control"
												placeholder="Enter Your Hostname"
											/>

											{(errors.hostname && touched.hostname) || (error && error.hostname) ? (
												<div className="error-sm">{errors.hostname || error.hostname}</div>
											) : null}
										</FormGroup>
									</Col>
									<Col md="6" sm="12">
										<FormGroup>
											<Label for="username">Username</Label>
											<Field
												type="text"
												name="username"
												id="username"
												className="form-control"
												placeholder="Enter Your Username"
											/>

											{(errors.username && touched.username) || (error && error.username) ? (
												<div className="error-sm">{errors.username || error.username}</div>
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
									<Col md="6" sm="12">
										<FormGroup>
											<Label for="folder_path">Folder Path</Label>
											<Field
												type="text"
												name="folder_path"
												id="folder_path"
												className="form-control"
												placeholder="Enter Your Folder Path"
											/>
											{(errors.folder_path && touched.folder_path) ||
											(error && error.folder_path) ? (
												<div className="error-sm">{errors.folder_path || error.folder_path}</div>
											) : null}
										</FormGroup>
									</Col>
									<Col sm="12">
										<FormGroup className="d-flex mb-0">
											<Button.Ripple className="mr-1" color="primary" type="submit">
												Submit
											</Button.Ripple>
											<Button.Ripple color="secondary" tag={Link} to="/ftp/list" outline>
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

export default CreateFtp;
