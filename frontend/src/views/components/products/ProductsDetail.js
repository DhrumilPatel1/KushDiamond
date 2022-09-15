import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ProductsDetialRequest } from '../../../redux/productsSlice';

// ** Custom Components
import Avatar from '@components/avatar';

const ProductsDetail = () => {
	const dispatch = useDispatch();
	const { id } = useParams();

	const { productViewData, error } = useSelector((state) => state.products);
	console.log(productViewData, 'viewDetailsviewDetails');

	useEffect(() => {
		dispatch(ProductsDetialRequest(id));
	}, []);

	return (
		<>
			{productViewData &&
				productViewData.images?.map((ele) => {
					return (
						<>
							<img src={ele} />
						</>
					);
				})}
		</>
	);
};

export default ProductsDetail;
