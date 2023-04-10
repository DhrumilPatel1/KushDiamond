// ** User List Component
import React, { useRef, useState, useCallback } from 'react';

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
	const getLoginData = JSON.parse(localStorage.getItem('userData'));
	const imageref = useRef(null);
	const dispatch = useDispatch();
	// const { productViewData, error } = useSelector((state) => state.products);

	const [productViewData, setProductViewData] = useState([]);
	const [imageGalleryArray, setImageGalleryArray] = useState([]);

	const clickOpenGallarey = useCallback(
		(rowsData) => {
			let arr = [];
			rowsData.forEach((image, index) => {
				if (image?.type == 'Image') {
					var images = {
						id: index,
						src: image.url,
						thumb: image.url,
						subHtml: image.image_name,
					};
					arr.push(images);
				}
				else if (image?.type == 'image/jpeg') {
					var images = {
						id: index,
						src: image.url,
						thumb: image.url,
						subHtml: image.image_name,
					};
					arr.push(images);
				} else if (image?.type == 'image/png') {
					var images = {
						id: index,
						src: image.url,
						thumb: image.url,
						subHtml: image.image_name,
					};
					arr.push(images);
				} else if (image?.type == 'video/mp4') {
					var images = {
						id: index,
						thumb: videoicon,
						subHtml: `<p>${image.image_name}</p>`,
						video: {
							source: [{ src: `${image.url}`, type: `${image.type}` }],
							attributes: { preload: false, playsinline: true, controls: true },
						},
					};
					arr.push(images);
				} else if (image?.type == 'video/quicktime') {
					var images = {
						id: index,
						thumb: videoicon,
						subHtml: `<p>${image.image_name}</p>`,
						video: {
							source: [{ src: `${image.url}`, type: `${image.type}` }],
							attributes: { preload: false, playsinline: true, controls: true },
						},
					};
					arr.push(images);
				}
			});
			setImageGalleryArray(arr);
		},
		[imageGalleryArray]
	);

	// const onInit = (detail) => {
	// 	console.log("oninti#############")
	// 	imageref.current = detail.instance;
	// 	// imageref.current.closeGallery();
	// };

	const onInit = useCallback((detail) => {
		// console.log('oninti#############');
		if (detail) {
			imageref.current = detail.instance;
		}
	}, []);
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

	// var getAllImages = [];
	// const getImages =
	// 	productViewData &&
	// 	productViewData.product_images?.map((image, index) => {
	// 		// console.log(image, 'image map');

	// 		if (image.type == 'Image') {
	// 			var images = {
	// 				id: index,
	// 				src: image.url,
	// 				thumb: image.url,
	// 				subHtml:
	// 					"<h4>Bowness Bay</h4><p>A beautiful Sunrise this morning taken En-route to Keswick not one as planned but I'm extremely happy I was passing the right place at the right time....</p>",
	// 			};
	// 			return getAllImages.push(images);
	// 		} else if (image.type == 'Video') {
	// 			var images = {
	// 				id: index,
	// 				thumb: videoicon,
	// 				subHtml: '<h4>Coniston Calmness</h4><p>Beautiful morning</p>',
	// 				video: {
	// 					source: [{ src: `${image.url}`, type: 'video/mp4' }],
	// 					attributes: { preload: false, playsinline: true, controls: true },
	// 				},
	// 			};
	// 			return getAllImages.push(images);
	// 		}
	// 	});

	const clearData = useCallback(() => {
		setImageGalleryArray([]);
	}, [imageGalleryArray]);

	// console.log(getAllImages, 'checked length');
	// console.log(getAllImages, 'getAllImages');

	useEffect(() => {
		// console.log('use Effect=======================', imageGalleryArray);
		if (imageGalleryArray.length > 0) {
			// imageref.current.refresh();
			imageref.current.openGallery();
		}
	}, [imageGalleryArray]);

	function Boxes({ name }) {
		return <h1>{name}</h1>;
	}

	return (
		<div className="app-user-list">
			{/* <h1>Products</h1> */}
			<Table clickOpenGallarey={(e) => clickOpenGallarey(e)} getLoginData={getLoginData} />
			<Boxes />
			<LightGallery
				onInit={onInit}
				download={true}
				zoom={true}
				fullScreen
				//speed={500}
				dynamic
				// onBeforeOpen={onBeforeOpen}
				videojs
				autoplayVideoOnSlide
				// onHasVideo={onHasVideo}
				// onPosterClick={onPosterClick}
				// onBeforeSlide={onBeforeSlide}
				videojsTheme="video-js"
				// strings={{ playVideo: "Play video" }}
				plugins={[lgThumbnail, lgVideo, lgZoom, lgFullscreen]}
				dynamicEl={imageGalleryArray}
				// onAfterClose={() => clearData()}
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
