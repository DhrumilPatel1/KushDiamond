import { createSlice } from '@reduxjs/toolkit';
import { ShopifySyncApi } from '../services/api';
import toast from 'react-hot-toast';

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

export const ShopifySyncRequest = () => async (dispatch, getState) => {
	// console.log("called done")
	const toastId = toast.loading('Please wait your Shopify is Syncing...');
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};

		const { data } = await ShopifySyncApi(config);
		const { statusCode, message } = data;

		if (statusCode === 200) {
			toast.success(message, {
				id: toastId,
			});

			dispatch(ShopifySyncData(data));
		}
	} catch (error) {
		const { statusCode, errors } = error.response.data;
		if (statusCode === 422) {
			dispatch(ShopifySyncErrorList(errors));
			toast.error(errors.message);
		}
	}
};
