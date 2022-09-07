import React from 'react';
import { CardBody, FormGroup, Row, Col, Input, Form, Button, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

const CreateFtp = () => {
	return (
		<CardBody>
			<Form>
				<Row>
					<Col md="6" sm="12">
						<FormGroup>
							<Label for="client_name">Client Name</Label>
							<Input
								type="text"
								name="client_name"
								id="client_name"
								placeholder="Enter Your Client Name"
							/>
						</FormGroup>
					</Col>
					<Col md="6" sm="12">
						<FormGroup>
							<Label for="protocol">Protocol</Label>
							<Input type="text" name="protocol" id="protocol" placeholder="Enter Your Protocol" />
						</FormGroup>
					</Col>
					<Col md="6" sm="12">
						<FormGroup>
							<Label for="port">Port</Label>
							<Input type="number" name="port" id="port" placeholder="Enter Your Port" />
						</FormGroup>
					</Col>
					<Col md="6" sm="12">
						<FormGroup>
							<Label for="hostname">Hostname</Label>
							<Input type="text" name="hostname" id="hostname" placeholder="Enter Your Hostname" />
						</FormGroup>
					</Col>
					<Col md="6" sm="12">
						<FormGroup>
							<Label for="username">Username</Label>
							<Input type="text" name="username" id="username" placeholder="Enter Your Username" />
						</FormGroup>
					</Col>
					<Col md="6" sm="12">
						<FormGroup>
							<Label for="password">Password</Label>
							<Input
								type="password"
								name="password"
								id="password"
								placeholder="Enter Your Password"
							/>
						</FormGroup>
					</Col>
					<Col md="6" sm="12">
						<FormGroup>
							<Label for="folder_path">Folder Path</Label>
							<Input
								type="text"
								name="folder_path"
								id="folder_path"
								placeholder="Enter Your Folder Path"
							/>
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
		</CardBody>
	);
};

export default CreateFtp;
