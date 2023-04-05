import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productList } from '../redux/productsSlice';

export default function useProductData() {
	const dispatch = useDispatch();
	const { productData, isLoading } = useSelector((state) => state.products);
	useEffect(() => {
		dispatch(productList());
	}, []);

	return { productData, isLoading };
}
