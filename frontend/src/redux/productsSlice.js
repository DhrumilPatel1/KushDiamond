import { createSlice } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';
import {
	FtpGetAllApi,
	ImageUploadApi,
	ProductApi,
	ProductExcelUploadTypeOne,
	ProductsDetailApi,
	SendFeedAPI,
} from '../services/api';
import toast, { Toaster } from 'react-hot-toast';

const accessToken = JSON.parse(localStorage.getItem('accessToken'));
let headers = {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH',
	Authorization: accessToken,
};

export const productsSlice = createSlice({
	name: 'products',
	initialState: {
		isLoading: false,
		productData: [],
		productViewData: [],
		ImageUploaFileData: [],
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

		productViewData: (state, action) => {
			state.isLoading = false;
			state.productViewData = action.payload;
		},

		ftpgetAllDatalist: (state, action) => {
			state.isLoading = false;
			state.ftpGetAllData = action.payload?.ftp_data;
		},

		excelTypeOne: (state, action) => {
			state.isLoading = false;
			state.excelTypeOne = action.payload;
		},

		ImageUploaFileData: (state, action) => {
			state.isLoading = false;
			state.ImageUploaFileData = action.payload;
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
		ProductResetData: (state) => {
			state.isLoading = false;
			state.error = null;
			state.ImageUploaFileData = [];
			state.excelTypeOne = [];
		},
	},
});

export const {
	productGetData,
	productViewData,
	ftpgetAllDatalist,
	ImageUploaFileData,
	handleErrorList,
	excelTypeOne,
	excelTypeOneReset,
	setLoading,
	FeedData,
	handleErrorExcel,
	FeedDataError,
	ProductResetData,
} = productsSlice.actions;

export default productsSlice.reducer;

export const productList = (queryString) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await ProductApi(queryString, config);
		dispatch(productGetData(data));
	} catch (err) {
		dispatch(handleErrorList(err));
	}
};

export const ImagesUploadRequest = (img_upload) => async (dispatch, getState) => {
	dispatch(setLoading());
	const toastId = toast.loading('Please wait your folder is Uploading...');
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await ImageUploadApi(img_upload, config);
		console.log(data, 'data');
		const { statusCode, message } = data;
		if (statusCode === 200) {
			toast.success(message, {
				id: toastId,
			});
			dispatch(ImageUploaFileData(data));
		}
	} catch (error) {
		const { statusCode, errors } = error.response.data;
		if (statusCode === 422) {
			dispatch(handleErrorList(errors));
			toast.error(errors.message, {
				id: toastId,
			});
		}
		// if (error.response && error.response.data.errors) {
		// 	return dispatch(handleErrorList(error.response.data.errors));
		// } else {
		// 	return dispatch(handleErrorList(error.message));
		// }
	}
};

export const FtpGetDataList = () => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};

		const { data } = await FtpGetAllApi(config);

		dispatch(ftpgetAllDatalist(data));
	} catch (err) {
		dispatch(ftpErrorList(err));
	}
};

export const ProductsDetialRequest = (details_id) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await ProductsDetailApi(details_id, config);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(productViewData(data));
		}
	} catch (error) {
		console.log(error.response);
		const { statusCode, message } = error.response.data;
		if (statusCode === 422) {
			toast.error(message);
		}
	}
};

export const productExcelUpload = (uploadfile) => async (dispatch, getState) => {
	dispatch(setLoading());
	const toastId = toast.loading('Please wait your excel Uploading...');
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await ProductExcelUploadTypeOne(uploadfile, config);
		const { statusCode, message } = data;
		if (statusCode === 200) {
			toast.success(message, {
				id: toastId,
			});
			dispatch(excelTypeOne(data));
			dispatch(productList());
		}
	} catch (error) {
		const { statusCode, message } = error.response.data;
		if (statusCode === 422) {
			dispatch(handleErrorExcel(message));
			toast.error(message, {
				id: toastId,
			});
		}
	}
};

export const sendFeed = (sendFeedData, queryString) => async (dispatch, getState) => {
	dispatch(setLoading());
	const toastId = toast.loading('Please wait FTP connection establish...');
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await SendFeedAPI(sendFeedData, queryString, config);
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
