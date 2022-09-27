import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ProductsDetialRequest } from '../../../redux/productsSlice';
import Breadcrumbs from '@components/breadcrumbs';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/scss/image-gallery.scss';

const ProductsDetail = () => {
	const dispatch = useDispatch();
	const { id } = useParams();

	const [index, setIndex] = useState(0);

	const { productViewData, error } = useSelector((state) => state.products);
	// console.log(productViewData, 'productViewData');
	useEffect(() => {
		dispatch(ProductsDetialRequest(id));
	}, []);

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
						<Row>
							<Col xl="6">
								<div className="image_slider">
									<ImageGallery
										items={getAllImages}
										showPlayButton={false}
										// showFullscreenButton={false}
									/>
									;
								</div>
							</Col>
						</Row>
					</CardBody>
				) : (
					'Images Not Found'
				)}
			</Card>
		</>
	);
};

export default ProductsDetail;
