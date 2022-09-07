import React, { useEffect } from 'react';
import { CardBody, FormGroup, Row, Col, Button, Label } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { FtpCreateRequest } from '../../../redux/FtpsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Slide, toast } from 'react-toastify';

const FtpCreateSchema = yup.object().shape({
	client_name: yup.string().required('Client Name is required'),
	protocol: yup.string().required('Protocol is required'),
	port: yup.string().required('Port is required'),
	hostname: yup.string().required('Hostname is required'),
	username: yup.string().required('Username is required'),
	password: yup
		.string()
		.min(9, 'Password must be at least 9 characters')
		.required('Password is required'),
	folder_path: yup.string().required('Folder Path is required'),
});

const CreateFtp = () => {
	const { ftpCreateData, error } = useSelector((state) => state.Ftps);
	console.log(ftpCreateData, 'ftpCreateData');
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (ftpCreateData && ftpCreateData !== null) {
			toast.success('Account successfully created');
			history.push('/ftp/list');
			// setTimeout(() => {
			// 	history.push('/ftp/list');
			// }, 100);
		}
		// return () => {
		// 	dispatch(handleResetAuth());
		// };
	}, [ftpCreateData]);

	return (
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
					console.log(values, 'values');
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
									{errors.client_name && touched.client_name ? (
										<div style={{ color: 'red' }}>{errors.client_name}</div>
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
									{errors.protocol && touched.protocol ? (
										<div style={{ color: 'red' }}>{errors.protocol}</div>
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
									{errors.port && touched.port ? (
										<div style={{ color: 'red' }}>{errors.port}</div>
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
									{errors.hostname && touched.hostname ? (
										<div style={{ color: 'red' }}>{errors.hostname}</div>
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
									{errors.username && touched.username ? (
										<div style={{ color: 'red' }}>{errors.username}</div>
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
									{errors.password && touched.password ? (
										<div style={{ color: 'red' }}>{errors.password}</div>
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
									{errors.folder_path && touched.folder_path ? (
										<div style={{ color: 'red' }}>{errors.folder_path}</div>
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
	);
};

export default CreateFtp;
