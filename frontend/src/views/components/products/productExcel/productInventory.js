import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardBody, Col, FormGroup, Label, Row, Form, Input } from 'reactstrap';
import { ExcelUploadTypeTwo } from '../../../../redux/productsSlice';

export default function productInventory() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [excelFile, setexcelFile] = useState(false);
	const { ImageUploaFileData, error, isLoading } = useSelector((state) => state.products);

	const excelUpload = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('file', excelFile);
		dispatch(ExcelUploadTypeTwo(formData));
		setexcelFile(false);
		e.target.reset();
	};

	const ExcelTypeTwo = (e) => {
		const files = e.target.files[0];
		setexcelFile(files);
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
								NOTE * <br></br>
								<b>
									Uploading This Excel File Will Syncronize Your Inventory To The Shopify Store.
								</b>
							</p>

							<div style={{ marginBottom: '1rem' }}>
								<span>Download: </span>
								<a
									href="http://107.22.15.221/media/sample/sample2.xlsx"
									style={{ textDecoration: 'underline' }}
								>
									sample.xlsx
								</a>
							</div>

							<Form onSubmit={(e) => excelUpload(e)}>
								<FormGroup>
									<Label for="folder_path">Inventory Excel</Label>
									<Input type="file" onChange={(e) => ExcelTypeTwo(e)} />
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
