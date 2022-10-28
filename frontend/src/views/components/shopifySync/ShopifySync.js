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
							<math xmlns="http://www.w3.org/1998/Math/MathML"><mfrac><mi>h</mi><mn>12</mn></mfrac><mo>=</mo><mfrac><mn>4</mn><mn>12</mn></mfrac></math>
							<p>The correct answer is E. You may want to make a sketch of this situation in your mind or, better yet, in the space in your test booklet. A sample sketch is shown in the following:</p><figure class="image"><img src="http://localhost:5000/admin/upload/1666256322627-image.png" /></figure><p>&nbsp;</p><p>A feet : 12 feet &nbsp; road flagpole E 4 feet 12 feet The vertical rod and the vertical flagpole each form a right angle with the level ground, resulting in two right triangles. The smaller right triangle (at left) is composed of the rod, the rod’s shadow, and the line of sight of the sun through the top of the rod. The larger right triangle (at right) is composed of the flagpole, the flagpole’s shadow, and the line of sight of the sun through the top of the flagpole. Because the angle of elevation of the sun is the same for each triangle, the two triangles are similar by the angle-angle similarity property. Using the ratios of corresponding sides of the similar triangles, the proportion &nbsp;<math xmlns="http://www.w3.org/1998/Math/MathML"><mfrac><mn>12</mn><mi>h</mi></mfrac><mo>=</mo><mfrac><mn>4</mn><mi>h</mi></mfrac></math>is solved to find the height of the flagpole, h = 36 feet. Common errors in this problem result from relying on an incorrect mental image or labeling the dimensions on the sketch incorrectly. If you chose A, you might have set up and solved the proportion&nbsp;<math xmlns="http://www.w3.org/1998/Math/MathML"><mfrac><mi>h</mi><mn>12</mn></mfrac><mo>=</mo><mfrac><mn>4</mn><mn>12</mn></mfrac></math></p>

						</Col>
					</Row>
				</CardBody>
			</Card>
		</>
	);
};

export default ShopifySync;
