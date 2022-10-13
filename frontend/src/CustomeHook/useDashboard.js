import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardRequest } from '../redux/DashboardSlice';


export default function useDashboard(){
	const dispatch = useDispatch();
	const { DashboardDataList, isLoading } = useSelector((state) => state.Dashboard);
	useEffect(() => {
		dispatch(DashboardRequest());
	}, []);

	return {DashboardDataList,isLoading};
}
