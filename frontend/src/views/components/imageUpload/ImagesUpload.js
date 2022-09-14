import React, { useEffect, useRef, useState } from 'react';
// import * as yup from 'yup';
import { Button, Card, CardBody, Col, FormGroup, Label, Row, Form, Input } from 'reactstrap';
// import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { ImagesUploadRequest } from '../../../redux/productsSlice';

// const ImageUploadSchema = yup.object().shape({
// 	product_img: yup.mixed().required('You need to provide a file'),
// });

const ImagesUpload = () => {
	const dispatch = useDispatch();

	const { ImageUploaFileData, error } = useSelector((state) => state.products);
	console.log(error, 'error');

	const [image, setImage] = useState([]);

	const handleChange = (e) => {
		const ProductImg = e.target.files;

		setImage(ProductImg);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();
		[...image].forEach((file) => formData.append('product_img', file));
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
									<Label for="folder_path">Image Upload</Label>
									<Input
										type="file"
										name="product_img"
										onChange={(e) => handleChange(e)}
										webkitdirectory=""
										directory=""
										multiple
									/>
									{/* {errors.product_img && touched.product_img ? (
										<div className="error-sm">{errors.product_img}</div>
									) : null} */}
								</FormGroup>
							</Col>
							<Col sm="12">
								<FormGroup className="d-flex mb-0">
									<Button.Ripple className="mr-1" color="primary" type="submit">
										Submit
									</Button.Ripple>
									{/* <Button.Ripple color="secondary" tag={Link} to="/ftp/list" outline>
												Back
											</Button.Ripple> */}
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
