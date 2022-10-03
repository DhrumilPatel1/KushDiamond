// ** User List Component
import React, { useRef, useState } from 'react';

import Table from './Table';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-video.css';
import lgVideo from 'lightgallery/plugins/video';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import videoicon from '../../../../VideoIcon-image/videoicon2.png';

// ** Styles
import '@styles/react/apps/app-users.scss';

import { useDispatch, useSelector } from 'react-redux';
import { ProductsDetialRequest } from '../../../../redux/productsSlice';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Col, Row } from 'reactstrap';

export default function ProductView() {
	const imageref = useRef(null);
	const dispatch = useDispatch();
	const { productViewData, error } = useSelector((state) => state.products);
	const { id } = useParams();

	const onInit = (detail) => {
		imageref.current = detail.instance;
		console.log('lightGallery has been initialized');
	};

	let onBeforeOpen = (detail) => {
		console.log('onBeforeOpen', detail);
		// imageref.current.closeGallery();
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

	useEffect(() => {
		dispatch(ProductsDetialRequest(id));
	}, []);

	var getAllImages = [];
	productViewData &&
		productViewData?.images?.forEach((image) => {
			var images = {
				original: image,
				thumbnail: image,
			};
      console.log(image,"image")
			getAllImages.push(images.original);
		});

    console.log(productViewData,"getAllImages")
	return (
		<div className="app-user-list">
			{/* <h1>Products</h1> */}
			<LightGallery
				onInit={onInit}
				download={false}
				zoom={false}
				// speed={500}
				// closable={false}
				onBeforeOpen={onBeforeOpen}
				videojs
				autoplayVideoOnSlide
				onHasVideo={onHasVideo}
				onPosterClick={onPosterClick}
				onBeforeSlide={onBeforeSlide}
				videojsTheme="video-js"
				// strings={{ playVideo: "Play video" }}
				plugins={[lgThumbnail, lgVideo, lgZoom]}
			>
				{getAllImages?.map((items, index) => (

          

					<a href={items} key={index}>
						<img src={items.url} className="gallary_images" />
					</a>
				))}

				{/* <a href="https://realestateim.s3.ap-south-1.amazonaws.com/products//var/www/html/kush_diamond/media/char1_22092022_0951.png">
					<img src="https://realestateim.s3.ap-south-1.amazonaws.com/products//var/www/html/kush_diamond/media/char1_22092022_0951.png" />
				</a>
				<a
					className="video-js"
					// data-lg-size="1280-720"
					data-video='{"source": [{"src":"https://realestateim.s3.ap-south-1.amazonaws.com/products/Cartoon+Status+Video+(1)_27092022_1119.mp4", "type":"video/mp4"}], "attributes": {"preload": false, "playsinline": true, "controls": true}}'
					data-poster={videoicon}
				>
					<img width="200" height="168" class="img-responsive" src={videoicon} />
				</a> */}
			</LightGallery>
		</div>
	);
}
