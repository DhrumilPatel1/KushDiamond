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
import { ProductsDetialRequest } from '../../../../redux/productsSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProductsList = () => {
	return (
		<div className="app-user-list">
			{/* <h1>Products</h1> */}
			<Table />
		</div>
	);
};

export default ProductsList;
