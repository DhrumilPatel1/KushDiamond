import { createSlice } from '@reduxjs/toolkit';
import { ProductApi, ProductExcelUploadTypeOne } from '../services/api';
import { toast, Slide } from 'react-toastify';
export const productsSlice = createSlice({
	name: 'products',
	initialState: {
		isLoading: false,
		productData: [],
		excelTypeOne: [],
		error: null,
	},
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		productGetData: (state, action) => {
			state.isLoading = false;
			state.productData = action.payload;
		},
		excelTypeOne: (state, action) => {
			state.isLoading = false;
			state.excelTypeOne = action.payload;
		},
		handleErrorList: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleErrorExcel:(state,action)=>{
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

export const { productGetData, handleErrorList, excelTypeOne,excelTypeOneReset,setLoading } = productsSlice.actions;

export default productsSlice.reducer;

export const productList = (queryString) => async (dispatch) => {
	dispatch(setLoading())
	try {
		const { data } = await ProductApi(queryString);
		dispatch(productGetData(data));
	} catch (err) {
		dispatch(handleErrorList(err));
	}
};

export const productExcelUpload = (uploadfile) => async (dispatch) => {
	try {
		const { data } = await ProductExcelUploadTypeOne(uploadfile);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(excelTypeOne(data));
			toast.success('File upload successfully');
			dispatch(productList())
		}
	} catch (err) {
		dispatch(handleErrorExcel(err));
	}
};
