import { createSlice } from '@reduxjs/toolkit';
import { DashboardAPI } from '../services/api';

export const DashboardSlice = createSlice({
	name: 'Dashboard',
	initialState: {
		isLoading: false,
		DashboardDataList: [],
		error: null,
	},
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},

		DashboardData: (state, action) => {
			state.isLoading = false;
			state.DashboardDataList = action.payload?.data;
		},

		DashboardError: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

export const { setLoading, DashboardData, DashboardError } = DashboardSlice.actions;

export default DashboardSlice.reducer;

export const DashboardRequest = () => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await DashboardAPI(config);
		dispatch(DashboardData(data));
	} catch (error) {
		dispatch(DashboardError(error.response));
	}
};
