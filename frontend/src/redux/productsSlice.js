import { createSlice } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';
import { FtpGetAllApi, ProductApi, ProductExcelUploadTypeOne, SendFeedAPI } from '../services/api';
import toast, { Toaster } from 'react-hot-toast';

export const productsSlice = createSlice({
	name: 'products',
	initialState: {
		isLoading: false,
		productData: [],
		excelTypeOne: [],
		ftpGetAllData: [],
		FeedData: [],
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

		ftpgetAllDatalist: (state, action) => {
			state.isLoading = false;
			state.ftpGetAllData = action.payload?.ftp_data;
		},

		excelTypeOne: (state, action) => {
			state.isLoading = false;
			state.excelTypeOne = action.payload;
		},
		handleErrorList: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleErrorExcel: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		FeedData: (state, action) => {
			state.isLoading = false;
			state.FeedData = action.payload;
		},
		FeedDataError: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

export const {
	productGetData,
	ftpgetAllDatalist,
	handleErrorList,
	excelTypeOne,
	excelTypeOneReset,
	setLoading,
	FeedData,
	FeedDataError,
} = productsSlice.actions;

export default productsSlice.reducer;

export const productList = (queryString) => async (dispatch) => {
	dispatch(setLoading());
	try {
		const { data } = await ProductApi(queryString);
		dispatch(productGetData(data));
	} catch (err) {
		dispatch(handleErrorList(err));
	}
};

export const FtpGetDataList = () => async (dispatch) => {
	dispatch(setLoading());
	try {
		const { data } = await FtpGetAllApi();

		dispatch(ftpgetAllDatalist(data));
	} catch (err) {
		dispatch(ftpErrorList(err));
	}
};

export const productExcelUpload = (uploadfile) => async (dispatch) => {
	try {
		const { data } = await ProductExcelUploadTypeOne(uploadfile);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(excelTypeOne(data));
			dispatch(productList());
		}
	} catch (err) {
		dispatch(handleErrorExcel(err));
	}
};

export const sendFeed = (sendFeedData) => async (dispatch) => {
	dispatch(setLoading());
	const toastId = toast.loading('Please wait FTP connection establish...');
	try {
		const { data } = await SendFeedAPI(sendFeedData);
		const { statusCode, message } = data;
		if (statusCode === 200) {
			dispatch(FeedData(data));
			toast.success(message, {
				id: toastId,
			});
		}
	} catch (error) {
		const { statusCode, message } = error.response.data;
		if (statusCode === 422) {
			dispatch(FeedDataError(message));
			toast.error(message, {
				id: toastId,
			});
		}
	}
};
