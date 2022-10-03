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


export default function ProductView() {
  const {id} = useParams();

  return (
    <div>
      
    </div>
  )
}
