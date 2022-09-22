import React, { useState } from 'react';
import { Button, Card, CardBody, Col, FormGroup, Label, Row, Form, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ImagesUploadRequest } from '../../../redux/productsSlice';

const ImagesUpload = () => {
	const dispatch = useDispatch();

	const { ImageUploaFileData, error, isLoading } = useSelector((state) => state.products);

	const [image, setImage] = useState([]);

	const handleChange = (e) => {
		const ProductImg = e.target.files;

		setImage(ProductImg);
	};

	const handleSubmit = (e) => {
		console.log('hello');
		e.preventDefault();
		let formData = new FormData();

		[...image].forEach((file) => {
			formData.append('product_img', file),
				formData.append(
					'folder_name',
					file.webkitRelativePath.substring(0, file.webkitRelativePath.lastIndexOf('/') + 1)
				);
		});

		dispatch(ImagesUploadRequest(formData));
		e.target.reset();
	};

	return (
		<>
			<Card>
				<CardBody>
					<Form onSubmit={(e) => handleSubmit(e)}>
						<Row>
							<Col md="6" sm="12">
								<FormGroup>
									<Label for="folder_path">Folder Upload</Label>

									<Input
										type="file"
										name="product_img"
										accept="image/*"
										onChange={(e) => handleChange(e)}
										webkitdirectory=""
										directory=""
										multiple
									/>
									{error && error.message ? <div className="error-sm">{error.message}</div> : null}
								</FormGroup>
							</Col>
							<Col sm="12">
								<FormGroup className="d-flex mb-0">
									{isLoading == true ? (
										<Button.Ripple className="mr-1" color="primary" type="submit" disabled>
											Submit
										</Button.Ripple>
									) : (
										<Button.Ripple className="mr-1" color="primary" type="submit">
											Submit
										</Button.Ripple>
									)}
								</FormGroup>
							</Col>
						</Row>
					</Form>
				</CardBody>
			</Card>
		</>
	);
};

export default ImagesUpload;
