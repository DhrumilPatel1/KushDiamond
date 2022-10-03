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
import { ProductResetData, ProductsDetialRequest } from '../../../../redux/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const ProductsList = () => {
	const imageref = useRef(null);
	const dispatch = useDispatch();
	const { productViewData, error } = useSelector((state) => state.products);
	const clickOpenGallarey = (id) => {
		dispatch(ProductsDetialRequest(id));
	};

	const onInit = (detail) => {
		imageref.current = detail.instance;
		// imageref.current.closeGallery();
	};

	let onBeforeOpen = (detail) => {
		console.log('onBeforeOpen', detail);
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

	var getAllImages = [];
	const getImages =
		productViewData &&
		productViewData?.images?.map((image, index) => {
			if (image.type == 'Image') {
				var images = {
					id: index,
					src: image.url,
					thumb: image.url,
					subHtml:
						"<h4>Bowness Bay</h4><p>A beautiful Sunrise this morning taken En-route to Keswick not one as planned but I'm extremely happy I was passing the right place at the right time....</p>",
				};
				return getAllImages.push(images);
			} else if (image.type == 'Video') {
				var images = {
					id: index,
					thumb: videoicon,
					subHtml: '<h4>Coniston Calmness</h4><p>Beautiful morning</p>',
					video: {
						source: [{ src: `${image.url}`, type: 'video/mp4' }],
						attributes: { preload: false, playsinline: true, controls: true },
					},
				};
				return getAllImages.push(images);
			}
		});

	const clearData = () => {
		dispatch(ProductResetData());
	};

	// console.log(getAllImages?.length,"checked length")

	useEffect(() => {
		if (getAllImages?.length > 0 && getAllImages != null) {
			imageref.current.refresh();
			imageref.current.openGallery();
		} else if (getAllImages?.lengt === 0) {
			imageref.current.closeGallery();
		}
	}, [dispatch, getAllImages]);

	return (
		<div className="app-user-list">
			{/* <h1>Products</h1> */}
			<Table clickOpenGallarey={clickOpenGallarey} />
			<LightGallery
				onInit={onInit}
				download={false}
				zoom={false}
				//speed={500}
				dynamic
				onBeforeOpen={onBeforeOpen}
				videojs
				autoplayVideoOnSlide
				onHasVideo={onHasVideo}
				onPosterClick={onPosterClick}
				onBeforeSlide={onBeforeSlide}
				videojsTheme="video-js"
				// strings={{ playVideo: "Play video" }}
				plugins={[lgThumbnail, lgVideo, lgZoom, lgFullscreen]}
				dynamicEl={getAllImages}
				onAfterClose={clearData}
			>
				{/* {
					getAllImages?.map((items,index) => (
						<a href={items} key={index}>
							<img src={items} />
						</a>
					))} */}
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
};

export default ProductsList;
