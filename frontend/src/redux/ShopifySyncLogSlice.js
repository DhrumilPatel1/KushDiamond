import { createSlice } from '@reduxjs/toolkit';
import { ShopifySyncLogListApi } from '../services/api';

export const ShopifySyncLogSlice = createSlice({
	name: 'ShopifySyncLog',
	initialState: {
		isLoading: false,
		ShopifySyncLogList: [],
		error: null,
	},
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},

		ShopifySyncLogData: (state, action) => {
			state.isLoading = false;
			state.ShopifySyncLogList = action.payload;
		},

		ShopifySyncLogErrorList: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

export const { ShopifySyncLogData, setLoading, ShopifySyncLogErrorList } =
	ShopifySyncLogSlice.actions;

export default ShopifySyncLogSlice.reducer;

export const ShopifySyncLogListRequest = (queryString) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await ShopifySyncLogListApi(queryString, config);
		dispatch(ShopifySyncLogData(data));
	} catch (error) {
		dispatch(ShopifySyncLogErrorList(error));
	}
};
