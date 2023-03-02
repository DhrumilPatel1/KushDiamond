import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	isExcelUploadSuccess,
	productExcelUpload,
	ProductResetData,
} from '../../../../redux/productsSlice';
import { Button, Card, CardBody, Col, FormGroup, Label, Row, Form, Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { CheckCircle } from 'react-feather';

export default function ProductExcelTypeOne() {
	const history = useHistory();

	const { ImageUploaFileData, error, isLoading, isExcelUploadSuccessmessage } = useSelector(
		(state) => state.products
	);

	const [excelFile, setexcelFile] = useState(false);
	const [visible, setVisible] = useState(true);
	const dispatch = useDispatch();

	const ExcelTypeOne = (e) => {
		dispatch(isExcelUploadSuccess(false));
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

	const closeAlert = () => {
		if (isExcelUploadSuccessmessage && isExcelUploadSuccessmessage == true) {
			dispatch(isExcelUploadSuccess(false));
		}
	};

	useEffect(() => {
		return () => {
			dispatch(isExcelUploadSuccess(false));
		};
	}, []);

	return (
		<div>
			<Card>
				<CardBody>
					<Row>
						<Col md="12" sm="12">
							{isExcelUploadSuccessmessage && isExcelUploadSuccessmessage == true ? (
								<React.Fragment>
									<Alert
										color="success"
										className="cursor-pointer"
										isOpen={visible}
										onClick={closeAlert}
									>
										<div className="alert-body">
											<CheckCircle
												size={20}
												className="bg-white rounded mr-1"
												style={{ padding: '3px' }}
											/>
											Products successfully created. now you have to upload product images from
											Image Upload page. also you can see status of shopify sync process from
											Shopify Sync Log page.
										</div>
									</Alert>
								</React.Fragment>
							) : null}

							<p>
								NOTE *<br></br>
								<b>
									Upload excel to add new/update existing product in databse. Make sure this is only
									for upload products not for Shopify synchronize.
								</b>
							</p>
							<div style={{ marginBottom: '1rem' }}>
								<span>Download: </span>
								<a
									// href="http://67.202.30.86/media/sample/sample1.xlsx"
									href="http://192.168.1.19:8000/media/sample/sample1.xlsx"
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
