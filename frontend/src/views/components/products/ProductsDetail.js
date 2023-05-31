import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Col, CustomInput, FormGroup, Input, Label, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
	ImageUploadDeleteRequest,
	ProductResetData,
	ProductsDetialRequest,
	SingleUploadImgRequest,
	imagePositionRequest,
	productCsvListData,
	productList,
} from '../../../redux/productsSlice';
import Breadcrumbs from '@components/breadcrumbs';
import { ReactSortable } from 'react-sortablejs';
import { Trash2, Upload } from 'react-feather';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import SortableList, { SortableItem } from 'react-easy-sort';
import arrayMove from 'array-move';
import ReactTooltip from 'react-tooltip';
import { Spinner } from 'reactstrap';

const ToastSwal = withReactContent(Swal);

const ProductsDetail = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const location = useLocation();

	const { productData, productCsvData, productViewData, isLoading, error } = useSelector(
		(state) => state.products
	);

	const viewProductData = location.state?.row;

	const [productPos, setProductPos] = useState(false);
	const [imgArr, setImgArr] = useState([]);
	const [items, setItems] = useState(imgArr);

	useEffect(() => {
		dispatch(ProductsDetialRequest(id));
		dispatch(productList());
		dispatch(productCsvListData());
		if (viewProductData) {
			// productData?.results?.map((ele) => {
			// 	if (ele.id == viewProductData.id) {
			// 		setImgArr(ele.product_images);
			// 	}
			// });
			productCsvData?.map((ele) => {
				if (ele.id == viewProductData.id) {
					setImgArr(ele.product_images);
				}
			});
		}
	}, [viewProductData]);

	useEffect(() => {
		// if (productData) {
		// 	productData?.results?.map((ele) => {
		// 		if (ele.id == viewProductData.id) {
		// 			setItems(ele.product_images);
		// 		}
		// 	});
		// }
		if (productCsvData) {
			productCsvData?.map((ele) => {
				if (ele.id == viewProductData.id) {
					setItems(ele.product_images);
				}
			});
		}
	}, [productCsvData]);

	useEffect(() => {
		if (productPos == true) {
			let data = [];
			const imgPositionObj = items?.map((ele) => {
				let imgArrayObj = {
					id: ele.id,
					position: data.push(ele.position),
				};

				return imgArrayObj;
			});

			// console.log({ imgPositionObj });

			let position_array = {
				position_array: imgPositionObj,
			};

			dispatch(imagePositionRequest(position_array));
			// dispatch(productList());
			// dispatch(productCsvListData());
			setProductPos(false);
		}
	}, [productPos]);

	const resetData = () => {
		dispatch(ProductResetData());
	};
	const renderImgVideo = (image) => {
		if (image?.type == 'image' || image?.type == 'image/jpeg' || image?.type == 'image/png' || image?.type == 'Image') {
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

	const handleChange = (e) => {
		const files = e.target.files[0];
		let formData = new FormData();
		formData.append('file', files);
		formData.append('sku', viewProductData?.sku);
		formData.append('title', viewProductData?.title);
		formData.append('product_id', viewProductData?.id);
		dispatch(SingleUploadImgRequest(formData));
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
							<Col md="5 d-flex" sm="12">
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
											defaultValue={viewProductData && viewProductData.shape}
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
											defaultValue={viewProductData && viewProductData.carat}
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
											defaultValue={viewProductData && viewProductData.stone}
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
											defaultValue={viewProductData && viewProductData.color}
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
											defaultValue={viewProductData && viewProductData.clarity}
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
											defaultValue={viewProductData && viewProductData.measurement}
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
											defaultValue={viewProductData && viewProductData.dept}
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
											defaultValue={viewProductData && viewProductData.tbl}
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
											defaultValue={viewProductData && viewProductData.cut}
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
											defaultValue={viewProductData && viewProductData.pol}
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
											defaultValue={viewProductData && viewProductData.sym}
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
											defaultValue={viewProductData && viewProductData.fl}
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
											defaultValue={viewProductData && viewProductData.cul}
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
											defaultValue={viewProductData && viewProductData.girdle}
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
											defaultValue={viewProductData && viewProductData.lab}
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
											defaultValue={viewProductData && viewProductData.certificate_no}
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
											defaultValue={viewProductData && viewProductData.rap}
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
											defaultValue={viewProductData && viewProductData.price}
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
											checked={viewProductData && viewProductData.is_active == true ? true : false}
											disabled={true}
										/>
									</FormGroup>
								</Col>
							</Col>
							<Col md="7">
								<div className="d-flex justify-content-between">
									<p>
										* NOTE * <br></br>
										<b>You can change image position</b>
									</p>
									<div>
										<Input
											type="file"
											id={'csvFileInput'}
											name="product_img"
											// accept="image/*"
											onChange={(e) => handleChange(e)}
											hidden
										/>

										<div
											className="cursor-pointer w-9rem border-round"
											style={{
												backgroundColor: '#7367f0',
												color: 'white',
												padding: '5px 12px',
												borderRadius: '5px',
											}}
										>
											<label htmlFor="csvFileInput" className="product-add-img-content">
												<Upload size={15} className="mr-1" />
												<span>Add Image</span>
											</label>
										</div>
									</div>
								</div>
								{items?.length > 0 || productPos == true ? (
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
											<div key={index}>
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
																			width: '12rem',
																			marginLeft: '7px',
																			fontWeight: 'bold',
																			fontSize: '15px',
																		}}
																	>
																		{item.image_name.substring(
																			item.image_name.lastIndexOf('/') + 1
																		)}
																	</p>
																</h6>
															</CardBody>
															<div className="item-options text-center d-flex justify-content-between mx-1 mt-2">
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
																		style={{
																			outline: 'none',
																		}}
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
								) : (
									<div className="d-flex justify-content-center mt-4">
										<Spinner color="primary" size="lg" style={{ width: '50px', height: '50px' }} />
									</div>
								)}
							</Col>
						</Col>
					</Row>
				</CardBody>
			</Card>
		</>
	);
};

export default ProductsDetail;
