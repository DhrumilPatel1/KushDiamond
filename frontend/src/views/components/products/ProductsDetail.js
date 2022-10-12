import React, { useEffect } from 'react';
import { Button, Card, CardBody, Col, CustomInput, FormGroup, Input, Label, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ProductResetData, ProductsDetialRequest } from '../../../redux/productsSlice';
import Breadcrumbs from '@components/breadcrumbs';

const ProductsDetail = () => {
	const dispatch = useDispatch();
	const { id } = useParams();

	const { productViewData, error } = useSelector((state) => state.products);
	console.log(productViewData, 'productViewData');

	useEffect(() => {
		dispatch(ProductsDetialRequest(id));
	}, []);

	const resetData = () => {
		dispatch(ProductResetData());
	};

	return (
		<>
			<Breadcrumbs
				breadCrumbTitle="Product Details"
				breadCrumbParent="products"
				breadCrumbActive="Details"
			/>

			<Card>
				<CardBody>
					{/* <Row>
						<Col md="12 d-flex">
							<Col md="8 d-flex" sm="12">
								<Col md="5">
									<FormGroup className="d-flex align-items-center">
										<Label for="sku" className="label_width">
											Sku
										</Label>
										<Input
											size="sm"
											type="text"
											name="sku"
											id="sku"
											defaultValue={productViewData && productViewData.sku}
											disabled={true}
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<Label for="shape" className="label_width">
											Shape
										</Label>
										<Input
											size="sm"
											type="text"
											name="shape"
											id="shape"
											defaultValue={productViewData && productViewData.shape}
											disabled={true}
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<Label for="carat" className="label_width">
											Carat
										</Label>
										<Input
											size="sm"
											type="number"
											name="carat"
											id="carat"
											defaultValue={productViewData && productViewData.carat}
											disabled={true}
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<Label for="stone" className="label_width">
											Stone
										</Label>
										<Input
											size="sm"
											type="number"
											name="stone"
											id="stone"
											defaultValue={productViewData && productViewData.stone}
											disabled={true}
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<Label for="color" className="label_width">
											Color
										</Label>
										<Input
											size="sm"
											type="text"
											name="color"
											id="color"
											defaultValue={productViewData && productViewData.color}
											disabled={true}
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<Label for="clarity" className="label_width">
											Clarity
										</Label>
										<Input
											size="sm"
											type="text"
											name="clarity"
											id="clarity"
											defaultValue={productViewData && productViewData.clarity}
											disabled={true}
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<Label for="measurement" className="label_width">
											Measurement
										</Label>
										<Input
											size="sm"
											type="text"
											name="measurement"
											id="measurement"
											defaultValue={productViewData && productViewData.measurement}
											disabled={true}
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<Label for="dept" className="label_width">
											Dept
										</Label>
										<Input
											size="sm"
											type="number"
											name="dept"
											id="dept"
											defaultValue={productViewData && productViewData.dept}
											disabled={true}
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<Label for="tbl" className="label_width">
											Tbl
										</Label>
										<Input
											size="sm"
											type="text"
											name="tbl"
											id="tbl"
											defaultValue={productViewData && productViewData.tbl}
											disabled={true}
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<Label for="cut" className="label_width">
											Cut
										</Label>
										<Input
											size="sm"
											type="text"
											name="cut"
											id="cut"
											defaultValue={productViewData && productViewData.cut}
											disabled={true}
										/>
									</FormGroup>
								</Col>
								<Col md="5">
									<FormGroup className="d-flex align-items-center">
										<Label for="pol" className="label_width">
											Pol
										</Label>
										<Input
											size="sm"
											type="text"
											name="pol"
											id="pol"
											defaultValue={productViewData && productViewData.pol}
											disabled={true}
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<Label for="sym" className="label_width">
											Sym
										</Label>
										<Input
											size="sm"
											type="text"
											name="sym"
											id="sym"
											defaultValue={productViewData && productViewData.sym}
											disabled={true}
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<Label for="fl" className="label_width">
											fl
										</Label>
										<Input
											size="sm"
											type="text"
											name="fl"
											id="fl"
											defaultValue={productViewData && productViewData.fl}
											disabled={true}
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<Label for="cul" className="label_width">
											Cul
										</Label>
										<Input
											size="sm"
											type="text"
											name="cul"
											id="cul"
											defaultValue={productViewData && productViewData.cul}
											disabled={true}
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<Label for="girdle" className="label_width">
											Girdle
										</Label>
										<Input
											size="sm"
											type="text"
											name="girdle"
											id="girdle"
											defaultValue={productViewData && productViewData.girdle}
											disabled={true}
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<Label for="lab" className="label_width">
											Lab
										</Label>
										<Input
											size="sm"
											type="text"
											name="lab"
											id="lab"
											defaultValue={productViewData && productViewData.lab}
											disabled={true}
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<Label for="certificate_no" className="label_width">
											Certificate No
										</Label>
										<Input
											size="sm"
											type="text"
											name="certificate_no"
											id="certificate_no"
											defaultValue={productViewData && productViewData.certificate_no}
											disabled={true}
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<Label for="rap" className="label_width">
											rap
										</Label>
										<Input
											size="sm"
											type="number"
											name="rap"
											id="rap"
											defaultValue={productViewData && productViewData.rap}
											disabled={true}
										/>
									</FormGroup>

									<FormGroup className="d-flex align-items-center">
										<Label for="price" className="label_width">
											price
										</Label>
										<Input
											size="sm"
											type="number"
											name="price"
											id="price"
											defaultValue={productViewData && productViewData.price}
											disabled={true}
										/>
									</FormGroup>
									<FormGroup className="d-flex align-items-center">
										<Label for="is_active" style={{ width: '80px' }}>
											Is Active
										</Label>
										<CustomInput
											type="switch"
											className="mx-5"
											size="sm"
											id="is_active"
											name="is_active"
											checked={productViewData && productViewData.is_active == true ? true : false}
											disabled={true}
										/>
									</FormGroup>
								</Col>
							</Col>
							<Col md="4">
								<div className="stone_image_container">
									<div>
										<Button.Ripple color="primary" className="upload_btn">
											Upload
										</Button.Ripple>
										<img src="https://demo.idiamondcloud.com/images/stone_image_01.jpg" />
									</div>

									<div>
										<img src="https://demo.idiamondcloud.com/images/stone_image_01.jpg" />
										<Button.Ripple color="primary" className="upload_btn">
											Upload
										</Button.Ripple>
									</div>
								</div>
							</Col>
						</Col>
						<Col sm="12">
							<FormGroup>
								<Button.Ripple
									size="sm"
									className="mx-2"
									color="secondary"
									tag={Link}
									onClick={resetData}
									to="/products/list"
									outline
								>
									Back
								</Button.Ripple>
							</FormGroup>
						</Col>
					</Row> */}
					<Row>
						<Col md="12 d-flex">
							<Col md="4 d-flex">
								<FormGroup className="d-flex align-items-center">
									<Label for="sku" className="label_width">
										Sku
									</Label>
									<Input
										size="sm"
										type="text"
										name="sku"
										id="sku"
										defaultValue={productViewData && productViewData.sku}
										disabled={true}
									/>
								</FormGroup>
							</Col>
							<Col md="8 d-flex">
								<div>
									<div className="box">
										<div className="row">
											<h2>item.title</h2>
											<span>$item.price</span>
										</div>

										<p>item.description</p>
										<p>item.content</p>

										<button className="cart">Add to cart</button>
									</div>
								</div>
							</Col>
						</Col>
						<Col sm="12">
							<FormGroup>
								<Button.Ripple
									size="sm"
									className="mx-2"
									color="secondary"
									tag={Link}
									onClick={resetData}
									to="/products/list"
									outline
								>
									Back
								</Button.Ripple>
							</FormGroup>
						</Col>
					</Row>
					{/* <div className="details">
						<div className="big-img">
							
							<h1>Images</h1>
						</div>

						<div className="box">
							<div className="row">
								<h2>item.title</h2>
								<span>$item.price</span>
							</div>
							

							<p>item.description</p>
							<p>item.content</p>

							<button className="cart">Add to cart</button>
						</div>
					</div> */}
				</CardBody>
			</Card>
		</>
	);
};

export default ProductsDetail;
