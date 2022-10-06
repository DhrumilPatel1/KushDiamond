import { createSlice } from '@reduxjs/toolkit';
import { ShopifySyncApi } from '../services/api';

export const ShopifySyncSlice = createSlice({
	name: 'ShopifySync',
	initialState: {
		isLoading: false,
		ShopifySyncList: [],
		error: null,
	},
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},

		ShopifySyncData: (state, action) => {
			state.isLoading = false;
			state.ShopifySyncList = action.payload;
		},

		ShopifySyncErrorList: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

export const { ShopifySyncData, setLoading, ShopifySyncErrorList } = ShopifySyncSlice.actions;

export default ShopifySyncSlice.reducer;

export const ShopifySyncRequest = (syncData) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await ShopifySyncApi(syncData, config);

		dispatch(ShopifySyncData(data));
	} catch (error) {
		dispatch(ShopifySyncErrorList(error));
	}
};
