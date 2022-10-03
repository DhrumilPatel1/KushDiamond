import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Eye, File, Image } from 'react-feather';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ProductsDetialRequest } from '../../../redux/productsSlice';
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

const ProductsActionIcon = (props) => {
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

	return (
		<>
			<Link to={`/products/view/${props.id}`} className="text-primary">
			<Image
				size={18}
				className="text-dark ml-2"
				style={{ cursor: 'pointer' }}
			/>
			</Link>
			<Link to={`/products/detail/${props.id}`} className="text-primary">
				<Eye size={18} className="ml-1" />
			</Link>

			{/* <Link to={`/products/edit/${props.id}`} className="text-warning mx-1">
				<Edit size={18} />
			</Link> */}
		</>
	);
};

export default ProductsActionIcon;
