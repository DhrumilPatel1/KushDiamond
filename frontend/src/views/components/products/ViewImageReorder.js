import React, { useEffect, useState } from 'react';
import ReorderImages from 'react-reorder-images';
import { ReactSortable } from 'react-sortablejs';
import { Heart, Trash2, XSquare } from 'react-feather';
import {
	Media,
	Modal,
	ModalHeader,
	ModalBody,
	ListGroupItem,
	FormGroup,
	Input,
	Form,
	Row,
	Col,
	Button,
	Card,
	CardBody,
} from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ImageUploadDeleteRequest, imagePositionRequest } from '../../../redux/productsSlice';
import { useDispatch } from 'react-redux';

const ToastSwal = withReactContent(Swal);

const ViewImageReorder = ({ row, rowId }) => {
	
	const dispatch = useDispatch();

	const [formModal, setFormModal] = useState(false);

	const [listArr, setListArr] = useState(row);

	// useEffect(() => {
	// 	if (formModal == true) {
	// 		handleChange(listArr);
	// 	}
	// }, [formModal, listArr]);

	// const imageUrl = row?.map((ele) => {
	// 	const imageObj = {
	// 		id: ele.id,
	// 		url: ele.url,
	// 		caption: <h1>{ele.image_name}</h1>,
	// 	};
	// 	return imageObj;
	// });

	// useEffect(() => {
	// 	if (imagePosition == true) {

	// 	}
	// }, [imagePosition]);

	const handleChange = () => {
		const imgPositionObj = listArr?.map((ele) => {
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
	};

	const renderImgVideo = (image) => {
		if (image?.type == 'image') {
			return <img className="img-fluid card-img-top" src={image.url} alt={image.image_name} />;
		} else if (image?.type == 'video') {
			return (
				<video controls>
					<source src={image.url} type="video/mp4" />
				</video>
			);
		}
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
					product_image_id: rowId.id,
					type: 'specific_image_delete',
				};

				dispatch(ImageUploadDeleteRequest(deleteImageObj));
			}
		});
	};

	return (
		<>
			{row?.length > 0 ? (
				<XSquare
					size={18}
					className="ml-2 outline-none cursor-pointer"
					onClick={() => setFormModal(true)}
				/>
			) : (
				<XSquare
					size={18}
					className="ml-2 outline-none cursor-pointer gallary_disabled"
					style={{ cursor: 'not-allowed' }}
				/>
			)}

			<Modal
				scrollable
				isOpen={formModal}
				toggle={() => setFormModal(!formModal)}
				className="modal-lg"
			>
				<ModalHeader toggle={() => setFormModal(!formModal)}>
					Image Gallery for {rowId?.sku}
				</ModalHeader>
				<ModalBody>
					{/* <div className="row">
						<ReorderImages
							images={imageUrl}
							callback={change}
							
						>
                            
                            </ReorderImages>
					</div> */}
					<ReactSortable
						tag="div"
						list={listArr}
						setList={setListArr}
						style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', columnGap: '1rem' }}
						onChange={() => handleChange()}
					>
						{listArr?.map((item, index) => {
							return (
								<div className="card-container mb-2" key={index}>
									<Card key={index} className="cardImg">
										<div className="item-img text-center mx-auto">{renderImgVideo(item)}</div>
										<CardBody className="card-body-content">
											<h6 className="item-name">{item.image_name}</h6>
										</CardBody>
										<div className="item-options text-center mb-1">
											<Button
												className="btn-wishlist"
												color="light"
												onClick={() => singleImageDelete(item.id)}
											>
												<Trash2 size={14} className="mr-1 text-danger" />
												<span>Remove Image</span>
											</Button>
										</div>
									</Card>
									<div className="text-center">{item.position}</div>
								</div>
							);
						})}
					</ReactSortable>
				</ModalBody>
			</Modal>
		</>
	);
};

export default ViewImageReorder;
