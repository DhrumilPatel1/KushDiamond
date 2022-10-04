import React, { useState } from 'react';
import { Button, Card, CardBody, Col, FormGroup, Label, Row, Form, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

const ShopifySync = () => {
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<>
			<Card>
				<CardBody>
					<Row>
						<Col md="3" sm="12">
							<p>NOTE *</p>
							<Form onSubmit={(e) => handleSubmit(e)}>
								<FormGroup className="d-flex mb-0">
									<Button.Ripple className="mr-1" color="primary" type="submit">
										Submit
									</Button.Ripple>
								</FormGroup>
							</Form>
						</Col>
					</Row>
				</CardBody>
			</Card>
		</>
	);
};

export default ShopifySync;
