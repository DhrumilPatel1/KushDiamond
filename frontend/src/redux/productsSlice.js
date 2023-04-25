import { createSlice } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';
import {
	ExcelTypetwo,
	FtpGetAllApi,
	ImagePositionApi,
	ImageUploadApi,
	ImageUploadDeleteApi,
	ProductApi,
	ProductCsvApi,
	ProductExcelUploadTypeOne,
	ProductsDetailApi,
	ProductsMultiDeleteApi,
	SendFeedAPI,
	VideoSirvUploadApi,
} from '../services/api';
import toast from 'react-hot-toast';

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
		productCsvData: [],
		productViewData: [],
		ImageUploaFileData: [],
		ImagePositionData: [],
		VideoUploaFileData: [],
		imageuploadDeleteData: [],
		MultiDeleteData: [],
		excelTypeOne: [],
		excelTypeTwo: [],
		ftpGetAllData: [],
		FeedData: [],
		isExcelUploadSuccessmessage: false,
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

		productCsvList: (state, action) => {
			state.isLoading = false;
			state.productCsvData = action.payload;
		},

		productViewData: (state, action) => {
			state.isLoading = false;
			state.productViewData = action.payload;
		},

		excelTypeOne: (state, action) => {
			state.isLoading = false;
			state.excelTypeOne = action.payload;
		},
		excelTypeTwo: (state, action) => {
			state.isLoading = false;
			state.excelTypeTwo = action.payload;
		},
		ImageUploaFileData: (state, action) => {
			state.isLoading = false;
			state.ImageUploaFileData = action.payload;
		},
		ImagePositionDataList: (state, action) => {
			state.isLoading = false;
			state.ImagePositionData = action.payload;
		},

		VideoUploaFile: (state, action) => {
			state.isLoading = false;
			state.VideoUploaFileData = action.payload;
		},

		ImageUploadDataDeleteList: (state, action) => {
			state.isLoading = false;
			state.imageuploadDeleteData = action.payload;
		},

		MultiDataDeleteList: (state, action) => {
			state.isLoading = false;
			state.MultiDeleteData = action.payload;
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
		isExcelUploadSuccess: (state, action) => {
			state.isExcelUploadSuccessmessage = action.payload;
		},
		ProductResetData: (state) => {
			state.isLoading = false;
			state.error = null;
			state.ImageUploaFileData = [];
			state.excelTypeOne = [];
			state.excelTypeTwo = [];
			state.productViewData = [];
		},
	},
});

export const {
	productGetData,
	productCsvList,
	productViewData,
	ImageUploaFileData,
	VideoUploaFile,
	ImageUploadDataDeleteList,
	ImagePositionDataList,
	MultiDataDeleteList,
	handleErrorList,
	excelTypeOne,
	excelTypeOneReset,
	setLoading,
	FeedData,
	handleErrorExcel,
	FeedDataError,
	ProductResetData,
	excelTypeTwo,
	isExcelUploadSuccess,
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

export const productCsvListData = (queryString) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await ProductCsvApi(queryString, config);
		dispatch(productCsvList(data));
	} catch (err) {
		dispatch(handleErrorList(err));
	}
};

export const imagePositionRequest = (img_position) => async (dispatch, getState) => {
	dispatch(setLoading());
	const toastId = toast.loading('Please wait...');
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await ImagePositionApi(img_position, config);

		const { statusCode, message } = data;
		if (statusCode === 200) {
			toast.success(message, {
				id: toastId,
			});
			dispatch(ImagePositionDataList(data));
			// dispatch(productList());
		}
	} catch (error) {
		const { statusCode, errors } = error.response.data;
		if (statusCode === 422) {
			dispatch(handleErrorList(errors));
			toast.error(errors?.message, {
				id: toastId,
			});
		}
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

		const { statusCode, message } = data;
		if (statusCode === 200) {
			toast.success(message, {
				id: toastId,
			});
			dispatch(ImageUploaFileData(data));
			dispatch(productList());
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

export const VideoSirvUploadRequest = (video_upload) => async (dispatch, getState) => {
	dispatch(setLoading());
	const toastId = toast.loading('Please wait your folder is Uploading...');

	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await VideoSirvUploadApi(video_upload, config);

		const { statusCode, message } = data;
		if (statusCode === 200) {
			toast.success(message, {
				id: toastId,
			});
			dispatch(VideoUploaFile(data));
		}
	} catch (error) {
		const { statusCode, errors } = error.response.data;
		if (statusCode === 422) {
			dispatch(handleErrorList(errors));
			toast.error(errors.message, {
				id: toastId,
			});
		}
	}
};

export const ImageUploadDeleteRequest = (deleteRequest) => async (dispatch, getState) => {
	dispatch(setLoading());
	const toastId = toast.loading('Please wait your data is deleteing...');
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};

		const { data } = await ImageUploadDeleteApi(deleteRequest, config);
		const { statusCode, message } = data;
		if (statusCode === 200) {
			toast.success(message, {
				id: toastId,
			});
			dispatch(ImageUploadDataDeleteList(data));
			dispatch(productList());
		}
	} catch (error) {
		const { statusCode, message } = error.response.data;
		if (statusCode === 422) {
			toast.error(message, {
				id: toastId,
			});
			dispatch(productList());
		}
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
		const { statusCode, message } = error.response.data;
		if (statusCode === 422) {
			toast.error(message);
		}
	}
};

export const ProductsMultiDeleteRequest = (DeleteIds) => async (dispatch, getState) => {
	const toastId = toast.loading('Please wait,Processing...');
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await ProductsMultiDeleteApi(DeleteIds, config);

		const { statusCode, message } = data;
		if (statusCode === 200) {
			toast.success(message, {
				id: toastId,
			});
			dispatch(MultiDataDeleteList(data));
			dispatch(productList());
		}
	} catch (error) {
		if (error.response && error.response.data)
			dispatch(handleErrorList(error.response.data.message));
		toast.error(error.response.data.message, {
			id: toastId,
		});
	}
};

export const productExcelUpload = (uploadfile) => async (dispatch, getState) => {
	dispatch(setLoading());
	const toastId = toast.loading('Please wait your excel is Uploading...');
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
			dispatch(isExcelUploadSuccess(true));

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

export const ExcelUploadTypeTwo = (exceluploadtwo) => async (dispatch, getState) => {
	dispatch(setLoading());
	const toastId = toast.loading('Please wait your excel type two is Uploading...');
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await ExcelTypetwo(exceluploadtwo, config);
		const { statusCode, message } = data;
		if (statusCode === 200) {
			toast.success(message, {
				id: toastId,
			});
			dispatch(excelTypeTwo(data));
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
