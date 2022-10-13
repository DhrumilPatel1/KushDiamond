import React, { useEffect, useState } from 'react';
import { CardBody, FormGroup, Row, Col, Button, Label, Card } from 'reactstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { ftpResetAuth, FtpUpdateList, FtpViewList } from '../../../redux/FtpsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumbs from '@components/breadcrumbs';
import { Eye, EyeOff } from 'react-feather';

const FtpUpdateSchema = yup.object().shape({
	client_name: yup.string().required('Client Name is required'),
	protocol: yup.string().required('Protocol is required'),
	port: yup
		.number()
		.positive()
		.integer()
		.min(2, 'Port must be at least 2 characters')
		.required('Port is required'),
	hostname: yup.string().required('Hostname is required'),
	username: yup.string().required('Username is required'),
	password: yup
		.string()
		.min(8, 'Password must be at least 8 characters')
		.required('Password is required'),
	folder_path: yup.string().required('Folder Path is required'),
});

const UpdateFtp = () => {
	const [passTextChange, setpassTextChange] = useState(false);
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

											{error && error.client_name ? (
												<div className="error-sm">{error.client_name}</div>
											) : null}
										</FormGroup>
									</Col>
									<Col md="6" sm="12">
										<FormGroup>
											<Label for="protocol">Protocol</Label>
											{/* <Field
												type="text"
												name="protocol"
												id="protocol"
												className="form-control"
												value={values.protocol}
												onChange={(e) => onInputChange(e)}
												placeholder="Enter Your Protocol"
											/> */}
											<Field
												component="select"
												id="protocol"
												name="protocol"
												value={values.protocol}
												onChange={(e) => onInputChange(e)}
												className="form-control"
											>
												<option value="">Select Protocol</option>
												<option value="FTP">FTP</option>
												<option value="SFTP">SFTP</option>
											</Field>
											{error && error.protocol ? (
												<div className="error-sm">{error.protocol}</div>
											) : null}
										</FormGroup>
									</Col>
									<Col md="6" sm="12">
										<FormGroup>
											<Label for="port">Port</Label>
											{/* <Field
												type="text"
												name="port"
												id="port"
												className="form-control"
												value={values.port}
												onChange={(e) => onInputChange(e)}
												placeholder="Enter Your Port"
											/> */}
											<Field
												component="select"
												id="port"
												name="port"
												value={values.port}
												onChange={(e) => onInputChange(e)}
												className="form-control"
											>
												<option value="">Select Port</option>
												<option value="21">21</option>
												<option value="22">22</option>
											</Field>
											{error && error.port ? <div className="error-sm">{error.port}</div> : null}
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
											{error && error.hostname ? (
												<div className="error-sm">{error.hostname}</div>
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
											{error && error.username ? (
												<div className="error-sm">{error.username}</div>
											) : null}
										</FormGroup>
									</Col>
									<Col md="6" sm="12">
										<FormGroup>
											<Label for="password">Password</Label>
											<Field
												type={passTextChange == true ? 'text' : 'password'}
												name="password"
												id="password"
												className="form-control"
												value={values.password}
												onChange={(e) => onInputChange(e)}
												placeholder="Enter Your Password"
											/>
											{passTextChange === true ? (
												<EyeOff
													className="password-eyes"
													onClick={() => setpassTextChange(!passTextChange)}
												/>
											) : (
												<Eye
													className="password-eyes"
													onClick={() => setpassTextChange(!passTextChange)}
												/>
											)}

											{error && error.password ? (
												<div className="error-sm">{error.password}</div>
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
											{error && error.folder_path ? (
												<div className="error-sm">{error.folder_path}</div>
											) : null}
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

export default UpdateFtp;
