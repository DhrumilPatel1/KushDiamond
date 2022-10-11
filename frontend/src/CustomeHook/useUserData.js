import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productList } from '../redux/productsSlice';
import { UserListRequest } from '../redux/userSlice';

export default function useUserData(){
	const dispatch = useDispatch();
    const { userList, isLoading } = useSelector((state) => state.user);
	useEffect(() => {
		dispatch(UserListRequest());
	}, []);

	return {userList,isLoading};
}
