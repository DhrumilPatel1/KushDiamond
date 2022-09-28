import React, { useState } from 'react';
import { Button, Card, CardBody, Col, FormGroup, Label, Row, Form, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	excelTypeTwo,
	ExcelUploadTypeTwo,
	ImagesUploadRequest,
	ProductResetData,
} from '../../../redux/productsSlice';
import { Share } from 'react-feather';
import { useRef } from 'react';

const ImagesUpload = () => {
	const dispatch = useDispatch();
	const { ImageUploaFileData, error, isLoading } = useSelector((state) => state.products);
	const [image, setImage] = useState([]);

	const handleChange = (e) => {
		const ProductImg = e.target.files;
		setImage(ProductImg);
	};
	const handleSubmit = (e) => {
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
		setImage([]);
	};

	return (
		<>
			<Card>
				<CardBody>
					<Row>
						{/* <Col md="3" sm="12">
							<Form onSubmit={(e) => excelUpload(e)}>
								<FormGroup>
									<Label for="folder_path">Excel Upload Type Two</Label>
									<Input type="file" onChange={(e) => ExcelTypeTwo(e)} />
								</FormGroup>
								{isLoading == true || excelFile == false ? (
									<Button.Ripple className="mr-1" color="dark" type="submit" disabled>
										Submit
									</Button.Ripple>
								) : (
									<Button.Ripple className="mr-1" color="dark" type="submit">
										Submit
									</Button.Ripple>
								)}
							</Form>
						</Col> */}
						<Col md="3" sm="12">
							{/* <p>NOTE *</p> */}
							<Form onSubmit={(e) => handleSubmit(e)}>
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
								<FormGroup className="d-flex mb-0">
									{isLoading == true || image.length === 0 ? (
										<Button.Ripple className="mr-1" color="primary" type="submit" disabled>
											Submit
										</Button.Ripple>
									) : (
										<Button.Ripple className="mr-1" color="primary" type="submit">
											Submit
										</Button.Ripple>
									)}
								</FormGroup>
							</Form>
						</Col>
					</Row>
				</CardBody>
			</Card>
		</>
	);
};

export default ImagesUpload;
