import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Image, Trash2 } from 'react-feather';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Tooltip,
	UncontrolledTooltip,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { ImageUploadDeleteRequest } from '../../../redux/productsSlice';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-video.css';
import lgVideo from 'lightgallery/plugins/video';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import videoicon from '../../../VideoIcon-image/videoicon2.png';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ToastSwal = withReactContent(Swal);

const ProductsActionIcon = (props) => {
	const dispatch = useDispatch();
	// const imageref = useRef(null)

	// const onInit = (detail) => {
	// 	imageref.current=detail.instance

	// 	console.log('lightGallery has been initialized');
	// };

	// let onBeforeOpen = (detail) =>{
	// 	console.log('onBeforeOpen', detail);
	// 	imageref.current.closeGallary();
	// }

	// let onHasVideo = (detail) => {
	// 	console.log('dety', detail);
	// };

	// let onPosterClick = (detail) => {
	// 	console.log('dety', detail);
	// };
	// const onBeforeSlide = (detail) => {
	// 	const { index, prevIndex } = detail;
	// 	console.log(index, prevIndex);
	// };

	const handleDeleteById = (id) => {
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
				dispatch(ImageUploadDeleteRequest(id));
			}
		});
	};

	// console.log(props?.row?.product_images,"props?.row?.product_images")

	// console.log(props?.row?.product_images, 'props?.row?.product_images');
	return (
		<>
			{/* <Image
				size={18}
				className="text-dark ml-2"
				onClick={() => props.clickOpenGallarey(props.id,props.row)}
				style={{ cursor: 'pointer' }}
			/> */}

			{props?.row?.product_images?.length > 0 ? (
				<>
					<Image
						id="UnControlledExample"
						size={18}
						className="text-dark ml-2"
						onClick={() => props.clickOpenGallarey(props.row.product_images)}
						style={{ cursor: 'pointer' }}
					/>

					<UncontrolledTooltip placement="top" target="UnControlledExample">
						View Gallary
					</UncontrolledTooltip>
				</>
			) : (
				<Image
					size={18}
					className="text-dark ml-2 gallary_disabled"
					style={{ cursor: 'not-allowed' }}
				/>
			)}

			<Link to={`/products/detail/${props.id}`} className="text-primary">
				<Eye size={18} className="ml-1" />
			</Link>

			<Trash2
				className="text-danger ml-1"
				size={18}
				onClick={() => handleDeleteById(props.id)}
				style={{ cursor: 'pointer' }}
			/>

			{/* <Link to={`/products/edit/${props.id}`} className="text-warning mx-1">
				<Edit size={18} />
			</Link> */}
		</>
	);
};

export default ProductsActionIcon;
