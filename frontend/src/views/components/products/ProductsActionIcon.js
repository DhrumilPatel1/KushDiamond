import React, { useState } from 'react';
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
import lgAutoplay from 'lightgallery/plugins/autoplay';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgHash from 'lightgallery/plugins/hash';
import lgPager from 'lightgallery/plugins/pager';
import lgRotate from 'lightgallery/plugins/rotate';
import lgShare from 'lightgallery/plugins/share';

import videoicon from '../../../VideoIcon-image/videoicon2.png';
const ProductsActionIcon = (props) => {
	const onInit = () => {
		console.log('lightGallery has been initialized');
	};

	let onHasVideo = (detail) => {
		console.log('dety', detail);
	};

	let onPosterClick = (detail) => {
		console.log('dety', detail);
	};
	const onBeforeSlide = (detail) => {
		const { index, prevIndex } = detail;
		console.log(index, prevIndex);
	};

	const [modal, setModal] = useState(null);
	const [modalCss, setModalCss] = useState(false);

	console.log(modalCss, 'modalCss');

	const dispatch = useDispatch();
	const { productViewData, error } = useSelector((state) => state.products);

	const toggleModal = (id) => {
		if (modal !== id) {
			setModal(id);
			dispatch(ProductsDetialRequest(id));
		} else {
			setModal(null);
		}
	};

	var getAllImages = [];
	const getImages =
		productViewData &&
		productViewData?.images?.map((image) => {
			var images = {
				original: image,
				thumbnail: image,
			};
			return getAllImages.push(images);
		});
	return (
		<>
			<Image
				size={18}
				className="text-dark mr-2"
				onClick={() => toggleModal(props.id)}
				style={{ cursor: 'pointer' }}
			/>

			<Modal
				isOpen={modal === props.id}
				toggle={() => toggleModal(props.id)}
				className={`modal-dialog-centered modal-xl`}
				key={props.id}
			>
				<ModalHeader className="dialog_model" toggle={() => toggleModal(props.id)}></ModalHeader>
				<ModalBody className="model_body">
					<LightGallery
						onInit={onInit}
						download={false}
						zoom={false}
						//speed={500}

						videojs
						autoplayVideoOnSlide
						onHasVideo={onHasVideo}
						onPosterClick={onPosterClick}
						onBeforeSlide={onBeforeSlide}
						videojsTheme="video-js"
						// strings={{ playVideo: "Play video" }}
						plugins={[lgThumbnail, lgVideo, lgZoom, lgFullscreen]}
					>
						<a href="https://realestateim.s3.ap-south-1.amazonaws.com/products//var/www/html/kush_diamond/media/char1_22092022_0951.png">
							<img src="https://realestateim.s3.ap-south-1.amazonaws.com/products//var/www/html/kush_diamond/media/char1_22092022_0951.png" />
						</a>
						<a href="https://realestateim.s3.ap-south-1.amazonaws.com/products//var/www/html/kush_diamond/media/char1_22092022_0951.png">
							<img src="https://realestateim.s3.ap-south-1.amazonaws.com/products//var/www/html/kush_diamond/media/char1_22092022_0951.png" />
						</a>
						<a
							className="video-js"
							// data-lg-size="1280-720"
							data-video='{"source": [{"src":"https://realestateim.s3.ap-south-1.amazonaws.com/products/Cartoon+Status+Video+(1)_27092022_1119.mp4", "type":"video/mp4"}], "attributes": {"preload": false, "playsinline": true, "controls": true}}'
							data-poster={videoicon}
						>
							<img width="200" height="168" class="img-responsive" src={videoicon} />
						</a>
					</LightGallery>

					{productViewData && productViewData?.images?.length > 0 ? (
						console.log(getAllImages, 'productViewData')
					) : (
						<>{<h1>Images Not Found</h1>}</>
					)}
				</ModalBody>
				<ModalFooter>
					<Button color="secondary" size="sm" onClick={() => toggleModal(props.id)} outline>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>

			<Link to={`/products/detail/${props.id}`} className="text-primary">
				<Eye size={18} />
			</Link>

			{/* <Link to={`/products/edit/${props.id}`} className="text-warning mx-1">
				<Edit size={18} />
			</Link> */}
		</>
	);
};

export default ProductsActionIcon;
