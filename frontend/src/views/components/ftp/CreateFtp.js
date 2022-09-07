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
							<Label for="nameMulti">Client Name</Label>
							<Input type="text" name="client_name" id="client_name" placeholder="Client Name" />
						</FormGroup>
					</Col>
					<Col md="6" sm="12">
						<FormGroup>
							<Label for="lastNameMulti">Protocol</Label>
							<Input type="text" name="lastname" id="lastNameMulti" placeholder="Last Name" />
						</FormGroup>
					</Col>
					<Col md="6" sm="12">
						<FormGroup>
							<Label for="cityMulti">Port</Label>
							<Input type="text" name="city" id="cityMulti" placeholder="City" />
						</FormGroup>
					</Col>
					<Col md="6" sm="12">
						<FormGroup>
							<Label for="CountryMulti">Hostname</Label>
							<Input type="text" name="country" id="CountryMulti" placeholder="Country" />
						</FormGroup>
					</Col>
					<Col md="6" sm="12">
						<FormGroup>
							<Label for="CompanyMulti">Username</Label>
							<Input type="text" name="company" id="CompanyMulti" placeholder="Company" />
						</FormGroup>
					</Col>
					<Col md="6" sm="12">
						<FormGroup>
							<Label for="EmailMulti">Password</Label>
							<Input type="email" name="Email" id="EmailMulti" placeholder="Email" />
						</FormGroup>
					</Col>
                    <Col md="6" sm="12">
						<FormGroup>
							<Label for="EmailMulti">Password</Label>
							<Input type="email" name="Email" id="EmailMulti" placeholder="Email" />
						</FormGroup>
					</Col>
					<Col sm="12">
						<FormGroup className="d-flex mb-0">
							<Button.Ripple className="mr-1" color="primary" type="submit">
								Submit
							</Button.Ripple>
							<Button.Ripple color="secondary" tag={Link} to="/ftp/list" outline>
								Cancel
							</Button.Ripple>
						</FormGroup>
					</Col>
				</Row>
			</Form>
		</CardBody>
	);
};

export default CreateFtp;
