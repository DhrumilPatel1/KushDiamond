import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Col, CustomInput, FormGroup, Input, Label, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
	ImageUploadDeleteRequest,
	ProductResetData,
	ProductsDetialRequest,
	imagePositionRequest,
} from '../../../redux/productsSlice';
import Breadcrumbs from '@components/breadcrumbs';
import { ReactSortable } from 'react-sortablejs';
import { Trash2, Upload } from 'react-feather';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SortableList, { SortableItem } from 'react-easy-sort';
import arrayMove from 'array-move';
import ReactTooltip from 'react-tooltip';

const ToastSwal = withReactContent(Swal);

const ProductsDetail = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const location = useLocation();

	const { productData, productViewData, isLoading, error } = useSelector((state) => state.products);

	const viewProductData = location.state?.row;

	const [productPos, setProductPos] = useState(false);
	const [items, setItems] = useState(viewProductData?.product_images);

	useEffect(() => {
		dispatch(ProductsDetialRequest(id));
	}, []);

	useEffect(() => {
		if (productData) {
			productData?.results?.map((ele) => {
				if (ele.id == viewProductData.id) {
					setItems(ele.product_images);
				}
			});
		}
	}, [productData]);

	useEffect(() => {
		if (productPos == true) {
			const imgPositionObj = items?.map((ele) => {
				let imgArrayObj = {
					id: ele.id,
					position: ele.position,
				};
				return imgArrayObj;
			});

			let position_array = {
				position_array: imgPositionObj,
			};

			dispatch(imagePositionRequest(position_array));
			setProductPos(false);
		}
	}, [productPos]);

	const resetData = () => {
		dispatch(ProductResetData());
	};
	const renderImgVideo = (image) => {
		if (image?.type == 'image' || image?.type == 'image/jpeg') {
			return <img className="img-fluid card-img-top" src={image.url} alt={image.image_name} />;
		} else if (
			image?.type == 'video' ||
			image?.type == 'video/mp4' ||
			image?.type == 'video/quicktime'
		) {
			return (
				<video controls>
					<source src={image.url} type="video/mp4" />
				</video>
			);
		}
	};

	const handleChange = () => {
		setProductPos(true);
		// const imgPositionObj = listArr?.map((ele) => {
		// 	let imgArrayObj = {
		// 		id: ele.id,
		// 		position: ele.position,
		// 	};
		// 	return imgArrayObj;
		// });

		// let position_array = {
		// 	position_array: imgPositionObj,
		// };

		// console.log(position_array, '---');

		// dispatch(imagePositionRequest(position_array));
	};

	const singleImageDelete = (id) => {
		ToastSwal.fire({
			title: 'Are you sure?',
			text: 'Once deleted, you will not be able to recover this images!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			customClass: {
				confirmButton: 'btn btn-primary',
				cancelButton: 'btn btn-outline-danger ml-1',
			},
			buttonsStyling: false,
		}).then((deleteRecord) => {
			if (deleteRecord.value) {
				const deleteImageObj = {
					product_id: id,
					product_image_id: viewProductData.id,
					type: 'specific_image_delete',
				};

				dispatch(ImageUploadDeleteRequest(deleteImageObj));
			}
		});
	};

	const onSortEnd = (oldIndex, newIndex) => {
		setItems((array) => arrayMove(array, oldIndex, newIndex));
		setProductPos(true);
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
					<Row>
						<Col md="12 d-flex">
							<Col md="6 d-flex" sm="12">
								<Col md="6">
									<FormGroup className="d-flex align-items-center">
										<Label for="sku" className="label_width">
											Sku
										</Label>
										<Input
											size="sm"
											type="text"
											name="sku"
											id="sku"
											defaultValue={viewProductData && viewProductData.sku}
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

									<FormGroup>
										<Button.Ripple
											size="sm"
											className="mt-1"
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
								<Col md="6">
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
							<Col md="6">
								<div className="d-flex justify-content-between">
									<p>
										*NOTE * <br></br>
										<b>You can change image position</b>
									</p>
									<div>
										<Input
											type="file"
											id={'csvFileInput'}
											name="product_img"
											accept="image/*"
											hidden
										/>

										<div
											className="cursor-pointer w-9rem border-round"
											style={{ backgroundColor: '#7367f0', color: 'white', padding: '5px 12px',borderRadius:'5px' }}
										>
											<label
												htmlFor="csvFileInput"
												className="product-add-img-content"
											>
												<Upload size={15} className='mr-1'/>
												<span>
													Add Image
												</span>
											</label>
										</div>
										{/* <span id="file-chosen" className="ml-3 text-lg font-bold">
												{selectFileName}
											</span> */}
									</div>
								</div>

								{/* <div>
									<ReactSortable
										tag="div"
										list={listArr}
										setList={setListArr}
										style={{
											display: 'grid',
											gridTemplateColumns: 'repeat(3,1fr)',
											columnGap: '1rem',
										}}
										onChange={() => handleChange()}
									>
										{listArr?.map((item, index) => {
											return (
												<div className="card-container mb-2" key={index}>
													<Card key={index} className="cardImg">
														
														<div className="text-center mx-auto">{renderImgVideo(item)}</div>
														<CardBody className="pt-1 px-0 text-center">
															<h6 className="item-name">
																{item.image_name.substring(item.image_name.lastIndexOf('/') + 1)}
															</h6>
															
														</CardBody>
														<div className="item-options text-center mb-1 d-flex justify-content-around align-items-center">
															<Button
																className="remove-btn-image"
																color="light"
																onClick={() => singleImageDelete(item.id)}
															>
																<Trash2 size={14} className="mr-1 text-danger" />
																<span style={{ fontSize: '12px' }}>Remove</span>
															</Button>
															<h6>Position: {item.position}</h6>
														</div>
													</Card>
												</div>
											);
										})}
									</ReactSortable>
								</div> */}

								<SortableList
									onSortEnd={onSortEnd}
									style={{
										display: 'grid',
										gridTemplateColumns: 'repeat(3,1fr)',
										columnGap: '1rem',
									}}
									draggedItemClassName="dragged"
								>
									{items?.map((item, index) => (
										<div>
											<SortableItem key={item}>
												<div className="card-container mb-2">
													<Card className="cardImg">
														<div className="text-center mx-auto">{renderImgVideo(item)}</div>
														<CardBody className="pt-1 px-0 text-center">
															<h6
																className="item-name d-flex justify-content-center"
																style={{ marginBottom: '10px' }}
															>
																Name:
																<p
																	style={{
																		marginLeft: '7px',
																		fontWeight: 'bold',
																		fontSize: '15px',
																	}}
																>
																	{item.image_name.substring(item.image_name.lastIndexOf('/') + 1)}
																</p>
															</h6>
														</CardBody>
														<div className="item-options text-center d-flex justify-content-between mx-1">
															<h6 className="d-flex">
																Position:
																<p
																	style={{
																		marginLeft: '7px',
																		fontWeight: 'bold',
																		fontSize: '15px',
																	}}
																>
																	{item.position}
																</p>
															</h6>
															<div>
																<Trash2
																	size={18}
																	className="text-danger cursor-pointer"
																	onClick={() => singleImageDelete(item.id)}
																	data-tip
																	data-for="remove_single_img"
																/>
																<ReactTooltip
																	id="remove_single_img"
																	className="tooltip_info"
																	place="top"
																	effect="solid"
																>
																	Remove image
																</ReactTooltip>
															</div>
														</div>
													</Card>
												</div>
											</SortableItem>
										</div>
									))}
								</SortableList>
							</Col>
						</Col>
						{/* <Col sm="12">
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
						</Col> */}
					</Row>
				</CardBody>
			</Card>
		</>
	);
};

export default ProductsDetail;
