import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { productExcelUpload } from '../../../../redux/productsSlice';
import { Button, Card, CardBody, Col, FormGroup, Label, Row, Form, Input } from 'reactstrap';



export default function ProductExcelTypeOne() {
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

	return (
		<div>
			<Card>
				<CardBody>
					<Row>
						<Col md="12" sm="12">
							<p>NOTE *<br></br>
<b>Product ***** Is The List Of The Product Which Content Existing Product Or New Product, This Product Will Be Either If SKU Found In The Database. The Product Will Be Updated, If Not Found New The Product Will Be Added. This Excel Upload Does Not Do Anything With Shopify Account. If You Want To Syncronize Product With Shopify Account Please Use The Functionality Of The Excel Type One(Inventory Excel).</b></p>
							<Form onSubmit={(e) => excelUploadTypeOne(e)}>
								<FormGroup>
									<Label for="folder_path">Product Excel</Label>
									<Input type="file" onChange={(e) => ExcelTypeOne(e)} />
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
						</Col>
					</Row>
				</CardBody>
			</Card>
		</div>
	);
}
