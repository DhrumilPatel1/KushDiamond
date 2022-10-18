import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ShopifySyncRequest } from '../../../redux/ShopifySyncSlice';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ToastSwal = withReactContent(Swal);
const ShopifySync = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		ToastSwal.fire({
			// title: 'Do you want to sync your Shopify store?',
			text: 'Do you want to sync your Shopify store?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Confirm',
			customClass: {
				confirmButton: 'btn btn-primary',
				cancelButton: 'btn btn-outline-danger ml-1',
			},
			buttonsStyling: false,
		}).then((shopifyconfirmSync) => {
			if (shopifyconfirmSync.value) {
				dispatch(ShopifySyncRequest());
			}
		});
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

							<Button.Ripple className="mr-1" size="sm" outline onClick={(e) => hisToryeBack(e)}>
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
