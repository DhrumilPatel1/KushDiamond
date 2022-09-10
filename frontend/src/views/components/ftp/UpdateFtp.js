import React, { useEffect, useState } from 'react';
import { CardBody, FormGroup, Row, Col, Button, Label, Card } from 'reactstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { ftpResetAuth, FtpUpdateList, FtpViewList } from '../../../redux/FtpsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Slide, toast } from 'react-toastify';
import Breadcrumbs from '@components/breadcrumbs';

const FtpUpdateSchema = yup.object().shape({
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

const UpdateFtp = () => {
	const { ftpUpdateData, error } = useSelector((state) => state.Ftps);

	useEffect(() => {
		dispatch(FtpViewList(id));
	}, []);
	const [values, setValues] = useState('');

	const { ftpViewData } = useSelector((state) => state.Ftps);

	const onInputChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		setValues({
			client_name: ftpViewData && ftpViewData.client_name,
			protocol: ftpViewData && ftpViewData.protocol,
			port: ftpViewData && ftpViewData.port,
			hostname: ftpViewData && ftpViewData.hostname,
			username: ftpViewData && ftpViewData.username,
			password: ftpViewData && ftpViewData.password,
			folder_path: ftpViewData && ftpViewData.folder_path,
		});
	}, [ftpViewData]);

	const dispatch = useDispatch();
	const history = useHistory();

	const { id } = useParams();

	const handleSubmit = (e) => {
		e.preventDefault();

		const { client_name, protocol, port, hostname, username, password, folder_path } = values;
		const updateFtpData = {
			client_name,
			protocol,
			port,
			hostname,
			username,
			password,
			folder_path,
		};
		dispatch(FtpUpdateList(id, updateFtpData));
	};

	useEffect(() => {
		if (ftpUpdateData.length !== 0) {
			toast.success('Account successfully updated');
			history.push('/ftp/list');
		}
		return () => {
			dispatch(ftpResetAuth());
		};
	}, [ftpUpdateData]);

	return (
		<>
			<Breadcrumbs breadCrumbTitle="FTP Update" breadCrumbParent="Ftp" breadCrumbActive="Update" />
			<Card>
				<CardBody>
					<Formik
						initialValues={{
							client_name: ftpViewData && ftpViewData.client_name,
							protocol: '',
							port: '',
							hostname: '',
							username: '',
							password: '',
							folder_path: '',
						}}
						enableReinitialize 
						validationSchema={FtpUpdateSchema}
					>
						{({ errors, touched }) => (
							<Form onSubmit={(e) => handleSubmit(e)}>
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
												value={values.client_name}
												onChange={(e) => onInputChange(e)}
											/>

											{(errors.client_name && touched.client_name && values.client_name == '') ||
											(error && error.client_name && values.client_name == '') ? (
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
												value={values.protocol}
												onChange={(e) => onInputChange(e)}
												placeholder="Enter Your Protocol"
											/>
											{(errors.protocol && touched.protocol && values.protocol == '') ||
											(error && error.protocol && values.protocol == '') ? (
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
												value={values.port}
												onChange={(e) => onInputChange(e)}
												placeholder="Enter Your Port"
											/>
											{(errors.port && touched.port && values.port == '') ||
											(error && error.port && values.port == '') ? (
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
												value={values.hostname}
												onChange={(e) => onInputChange(e)}
												placeholder="Enter Your Hostname"
											/>
											{(errors.hostname && touched.hostname && values.hostname == '') ||
											(error && error.hostname && values.hostname == '') ? (
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
												value={values.username}
												onChange={(e) => onInputChange(e)}
												placeholder="Enter Your Username"
											/>
											{(errors.username && touched.username && values.username == '') ||
											(error && error.username && values.username == '') ? (
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
												value={values.password}
												onChange={(e) => onInputChange(e)}
												placeholder="Enter Your Password"
											/>
											{(errors.password && touched.password && values.password == '') ||
											(error && error.password && values.password == '') ? (
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
												value={values.folder_path}
												onChange={(e) => onInputChange(e)}
												placeholder="Enter Your Folder Path"
											/>
											{(errors.folder_path && touched.folder_path && values.folder_path == '') ||
											(error && error.folder_path && values.folder_path == '') ? (
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

export default UpdateFtp;
