import { createSlice } from '@reduxjs/toolkit';
import { ProductApi } from '../services/api';

export const productsSlice = createSlice({
	name: 'products',
	initialState: {
		isLoading: false,
		productData: [],
		error: null,
	},
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		productGetData: (state, action) => {
			state.isLoading = false;
			state.productData = action.payload?.results;
		},
		handleErrorList: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

export const { productGetData, handleErrorList } = productsSlice.actions;

export default productsSlice.reducer;

export const productList = () => async (dispatch) => {
	try {
		const { data } = await ProductApi();
		dispatch(productGetData(data));
	} catch (err) {
		dispatch(handleErrorList(err));
	}
};
