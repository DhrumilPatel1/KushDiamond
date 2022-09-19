import React from 'react';
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

const EditProducts = () => {
	return (
		<Card>
			<CardBody>
				<Form>
					<Row>
						<Col md="12 d-flex">
							<Col md="8 d-flex" sm="12">
								<Col md="5">
									<FormGroup className="d-flex align-items-center">
										<label for="sku" className="label_width">
											Sku
										</label>
										<Input size="sm" type="text" name="sku" id="sku" placeholder="Enter your sku" />
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<label for="shape" className="label_width">
											Shape
										</label>
										<Input
											size="sm"
											type="text"
											name="shape"
											id="shape"
											placeholder="Enter your shape"
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<label for="carat" className="label_width">
											Carat
										</label>
										<Input
											size="sm"
											type="number"
											name="carat"
											id="carat"
											placeholder="Enter your carat"
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<label for="stone" className="label_width">
											Stone
										</label>
										<Input
											size="sm"
											type="number"
											name="stone"
											id="stone"
											placeholder="Enter your stone"
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<label for="color" className="label_width">
											Color
										</label>
										<Input
											size="sm"
											type="text"
											name="color"
											id="color"
											placeholder="Enter your color"
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<label for="clarity" className="label_width">
											Clarity
										</label>
										<Input
											size="sm"
											type="text"
											name="clarity"
											id="clarity"
											placeholder="Enter your clarity"
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<label for="measurement" className="label_width">
											Measurement
										</label>
										<Input
											size="sm"
											type="text"
											name="measurement"
											id="measurement"
											placeholder="Enter your measurement"
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<label for="dept" className="label_width">
											Dept
										</label>
										<Input
											size="sm"
											type="number"
											name="dept"
											id="dept"
											placeholder="Enter your dept"
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<label for="tbl" className="label_width">
											Tbl
										</label>
										<Input size="sm" type="text" name="tbl" id="tbl" placeholder="Enter your tbl" />
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<label for="cut" className="label_width">
											Cut
										</label>
										<Input size="sm" type="text" name="cut" id="cut" placeholder="Enter your cut" />
									</FormGroup>
								</Col>
								<Col md="5">
									<FormGroup className="d-flex align-items-center">
										<label for="pol" className="label_width">
											Pol
										</label>
										<Input size="sm" type="text" name="pol" id="pol" placeholder="Enter your pol" />
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<label for="sym" className="label_width">
											Sym
										</label>
										<Input size="sm" type="text" name="sym" id="sym" placeholder="Enter your sym" />
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<label for="fl" className="label_width">
											fl
										</label>
										<Input size="sm" type="text" name="fl" id="fl" placeholder="Enter your fl" />
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<label for="cul" className="label_width">
											Cul
										</label>
										<Input size="sm" type="text" name="cul" id="cul" placeholder="Enter your cul" />
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<label for="girdle" className="label_width">
											Girdle
										</label>
										<Input
											size="sm"
											type="text"
											name="girdle"
											id="girdle"
											placeholder="Enter your girdle"
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<label for="lab" className="label_width">
											Lab
										</label>
										<Input size="sm" type="text" name="lab" id="lab" placeholder="Enter your lab" />
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<label for="certificate_no" className="label_width">
											Certificate No
										</label>
										<Input
											size="sm"
											type="text"
											name="certificate_no"
											id="certificate_no"
											placeholder="Enter your certificate_no"
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<label for="rap" className="label_width">
											rap
										</label>
										<Input
											size="sm"
											type="number"
											name="rap"
											id="rap"
											placeholder="Enter your rap"
										/>
									</FormGroup>

									<FormGroup className="d-flex align-items-center">
										<label for="price" className="label_width">
											price
										</label>
										<Input
											size="sm"
											type="number"
											name="price"
											id="price"
											placeholder="Enter your price"
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<label for="is_active" className="label_width">
											Is Active
										</label>
										<Input
											size="sm"
											type="text"
											name="is_active"
											id="is_active"
											placeholder="Enter your is_active"
										/>
									</FormGroup>
								</Col>
							</Col>
							<Col md="4">
								<div className="stone_image_container">
									<div>
										<Button.Ripple  color="primary" className="upload_btn">
											Upload
										</Button.Ripple>
										<img
											src="https://demo.idiamondcloud.com/images/stone_image_01.jpg"
										/>
									</div>

									<div>
										<img
											src="https://demo.idiamondcloud.com/images/stone_image_01.jpg"
										/>
										<Button.Ripple  color="primary" className="upload_btn">
											Upload
										</Button.Ripple>
									</div>
								</div>
							</Col>
						</Col>
					</Row>
				</Form>
			</CardBody>
		</Card>
	);
};

export default EditProducts;
