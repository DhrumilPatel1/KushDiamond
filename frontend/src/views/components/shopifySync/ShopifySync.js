import React, { useState } from 'react';
import { Button, Card, CardBody, Col, FormGroup, Label, Row, Form, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ShopifySyncRequest } from '../../../redux/ShopifySyncSlice';
import { useHistory } from 'react-router-dom';

const ShopifySync = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(ShopifySyncRequest());
	};
	const hisToryeBack = () => {
		history.goBack();
	};
	return (
		<>
			<Card>
				<CardBody>
					<Row>
						<Col md="3" sm="12">
							{/* <p>NOTE *</p> */}
							<h2>Shopify Sync</h2>
							<Button.Ripple
								className="mr-1"
								onClick={(e) => handleSubmit(e)}
								color="primary"
								type="submit"
								size="sm"
							>
								Sync
							</Button.Ripple>

							<Button.Ripple
								className="mr-1"
								size="sm"
								color="dark"
								onClick={(e) => hisToryeBack(e)}
							>
								Back
							</Button.Ripple>
						</Col>
					</Row>
				</CardBody>
			</Card>
		</>
	);
};

export default ShopifySync;
