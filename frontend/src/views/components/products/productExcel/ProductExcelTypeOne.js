import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { productExcelUpload, ProductResetData } from '../../../../redux/productsSlice';
import { Button, Card, CardBody, Col, FormGroup, Label, Row, Form, Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';

export default function ProductExcelTypeOne() {
	const history = useHistory();

	const { ImageUploaFileData, error, isLoading } = useSelector((state) => state.products);
	const [excelFile, setexcelFile] = useState(false);
	const dispatch = useDispatch();

	const ExcelTypeOne = (e) => {
		const files = e.target.files[0];
		setexcelFile(files);
	};

	const excelUploadTypeOne = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('file', excelFile);
		dispatch(productExcelUpload(formData));
		setexcelFile(false);
		e.target.reset();
	};

	const hisToryeBack = () => {
		history.goBack();
	};

	return (
		<div>
			<Card>
				<CardBody>
					<Row>
						<Col md="12" sm="12">
							<p>
								NOTE *<br></br>
								<b>
									Upload excel to add new/update existing product in databse. Make sure this is only
									for uplod products not for Shopify synchronize.
								</b>
							</p>

							<div style={{ marginBottom: '1rem' }}>
								<span>Download: </span>
								<a
									href="http://107.22.15.221/media/sample/sample.xlsx"
									style={{ textDecoration: 'underline' }}
								>
									sample.xlsx
								</a>
							</div>

							<Form onSubmit={(e) => excelUploadTypeOne(e)}>
								<FormGroup>
									<Label for="folder_path">Product Excel</Label>
									<Input type="file" onChange={(e) => ExcelTypeOne(e)} />
								</FormGroup>
								{isLoading == true || excelFile == false ? (
									<Button.Ripple className="mr-1" size="sm" color="primary" type="submit" disabled>
										Submit
									</Button.Ripple>
								) : (
									<Button.Ripple className="mr-1" size="sm" color="primary" type="submit">
										Submit
									</Button.Ripple>
								)}
								<Button.Ripple className="mr-1" size="sm" outline onClick={(e) => hisToryeBack(e)}>
									Back
								</Button.Ripple>
							</Form>
						</Col>
					</Row>
				</CardBody>
			</Card>
		</div>
	);
}
