import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ProductsDetialRequest } from '../../../redux/productsSlice';
import Breadcrumbs from '@components/breadcrumbs';
import SwiperCore, { Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap';
import { useRTL } from '@hooks/useRTL';
import img1 from '@src/assets/images/banner/banner-11.jpg';
import img2 from '@src/assets/images/banner/banner-12.jpg';
import img3 from '@src/assets/images/banner/banner-13.jpg';
import img4 from '@src/assets/images/banner/banner-14.jpg';
import img5 from '@src/assets/images/banner/banner-15.jpg';

import '@styles/react/libs/swiper/swiper.scss';

SwiperCore.use([Thumbs]);

const ProductsDetail = () => {
	const dispatch = useDispatch();
	const { id } = useParams();

	const [index, setIndex] = useState(0);
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const [isRtl, setIsRtl] = useRTL();

	const { productViewData, error } = useSelector((state) => state.products);
	console.log(productViewData, 'productViewData');
	useEffect(() => {
		dispatch(ProductsDetialRequest(id));
	}, []);

	const handleTab = (index) => {
		setIndex(index);
	};

	const params = {
		className: 'swiper-gallery',
		spaceBetween: 10,
		navigation: true,
		pagination: {
			clickable: true,
		},
		thumbs: { swiper: thumbsSwiper },
	};

	const paramsThumbs = {
		className: 'gallery-thumbs',
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		onSwiper: setThumbsSwiper,
	};

	return (
		<>
			<Breadcrumbs
				breadCrumbTitle="Product Details"
				breadCrumbParent="products"
				breadCrumbActive="Details"
			/>
			<Card>
				<CardHeader>
					<CardTitle tag="h4">Gallery</CardTitle>
				</CardHeader>
				{productViewData && productViewData?.images?.length > 0 ? (
					<CardBody>
						<div className="swiper-gallery">
							<Swiper dir={isRtl ? 'rtl' : 'ltr'} {...params}>
								{productViewData &&
									productViewData?.images?.map((image, index) => {
										return (
											<SwiperSlide>
												<img
													src={image}
													alt="swiper 3"
													style={{ height: '350px', width: '100%' }}
													className="img-fluid"
												/>
											</SwiperSlide>
										);
									})}

								{/* <SwiperSlide>
									<img src={img1} alt="swiper 1" className="img-fluid" />
								</SwiperSlide>
								<SwiperSlide>
									<img src={img2} alt="swiper 2" className="img-fluid" />
								</SwiperSlide>
								<SwiperSlide>
									<img src={img3} alt="swiper 3" className="img-fluid" />
								</SwiperSlide>
								<SwiperSlide>
									<img src={img4} alt="swiper 4" className="img-fluid" />
								</SwiperSlide>
								<SwiperSlide>
									<img src={img5} alt="swiper 5" className="img-fluid" />
								</SwiperSlide> */}
							</Swiper>
							<Swiper {...paramsThumbs}>
								{productViewData &&
									productViewData?.images?.map((image, index) => {
										return (
											<SwiperSlide>
												<img
													src={image}
													alt="swiper 3"
													style={{ height: '100px', width: '100%' }}
													className="img-fluid"
												/>
											</SwiperSlide>
										);
									})}

								{/* 							
								<SwiperSlide>
									<img src={img4} alt="swiper 4" className="img-fluid" />
								</SwiperSlide>
								<SwiperSlide>
									<img src={img5} alt="swiper 5" className="img-fluid" />
								</SwiperSlide> */}
							</Swiper>
						</div>
					</CardBody>
				) : (
					'Images Not Found'
				)}
			</Card>
		</>
	);
};

export default ProductsDetail;
