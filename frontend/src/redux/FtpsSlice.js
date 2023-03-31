import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
	FtpCreateApi,
	FtpDeleteApi,
	FtpFeedApi,
	FtpGetAllApi,
	FtpListApi,
	FtpUpdateApi,
	FtpViewApi,
} from '../services/api';

export const FtpsSlice = createSlice({
	name: 'Ftps',
	initialState: {
		isLoading: false,
		ftpData: [],
		ftpFeedData: [],
		ftpfeedTotalCountData: [],
		ftpViewData: [],
		ftpCreateData: [],
		ftpDeleteData: [],
		ftpUpdateData: [],
		ftpGetAllData: [],
		FtpCreateError: [],
		error: null,
	},
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},

		ftpGetData: (state, action) => {
			state.isLoading = false;
			state.ftpData = action.payload;
		},

		ftpFeedDataList: (state, action) => {
			state.isLoading = false;
			state.ftpFeedData = action.payload;
		},

		ftpfeedTotalCountDataList: (state, action) => {
			state.isLoading = false;
			state.ftpfeedTotalCountData = action.payload;
		},

		ftpgetAllDatalist: (state, action) => {
			state.isLoading = false;
			state.ftpGetAllData = action.payload?.data;
		},

		ftpViewData: (state, action) => {
			state.isLoading = false;
			state.ftpViewData = action.payload?.data;
		},

		ftpCreateData: (state, action) => {
			state.isLoading = false;
			state.ftpCreateData = action.payload?.data;
		},

		ftpUpdateData: (state, action) => {
			state.isLoading = false;
			state.ftpUpdateData = action.payload?.data;
		},

		ftpErrorList: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},

		ftpDeleteData: (state, action) => {
			state.isLoading = false;
			state.ftpDeleteData = action.payload;
		},

		ftpResetAuth: (state) => {
			state.isLoading = false;
			state.error = null;
			state.ftpCreateData = null;
			state.ftpUpdateData = [];
			state.FtpCreateError = [];
		},
		ftpFeedResestData: (state) => {
			state.isLoading = false;
			state.error = null;
			state.ftpfeedTotalCountData = [];
		},
	},
});

export const {
	ftpGetData,
	ftpFeedDataList,
	ftpfeedTotalCountDataList,
	ftpViewData,
	ftpCreateData,
	ftpUpdateData,
	setLoading,
	ftpgetAllDatalist,
	ftpErrorList,
	ftpDeleteData,
	createSuccess,
	ftpResetAuth,
	FtpCreateError,
	ftpFeedResestData
} = FtpsSlice.actions;

export default FtpsSlice.reducer;

export const FtpClientList = (queryString) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await FtpListApi(queryString, config);

		dispatch(ftpGetData(data));
	} catch (err) {
		dispatch(ftpErrorList(err));
	}
};

export const FtpFeedRecordList = (queryString) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await FtpFeedApi(queryString, config);
		dispatch(ftpFeedDataList(data));
	} catch (err) {
		dispatch(ftpErrorList(err));
	}
};

export const ftpfeedTotalCountRecordList = (queryString) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await FtpFeedApi(queryString, config);
		dispatch(ftpfeedTotalCountDataList(data));
	} catch (err) {
		dispatch(ftpErrorList(err));
	}
};

export const FtpGetDataDrowpDown = () => async (dispatch, getState) => {
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

export const FtpViewList = (id) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await FtpViewApi(id, config);

		dispatch(ftpViewData(data));
	} catch (err) {
		dispatch(ftpErrorList(err));
	}
};

export const FtpUpdateList = (id, updatedata) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await FtpUpdateApi(id, updatedata, config);

		const { statusCode, message } = data;
		if (statusCode === 200) {
			toast.success(message);
			dispatch(ftpUpdateData(data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(ftpErrorList(error.response.data.errors));
		} else {
			return dispatch(ftpErrorList(error.message));
		}
	}
};

export const FtpCreateRequest = (ftpData) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};

		const { data } = await FtpCreateApi(ftpData, config);

		const { statusCode, message } = data;

		if (statusCode === 201) {
			toast.success(message);
			dispatch(ftpCreateData(data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(ftpErrorList(error.response.data.errors));
		} else {
			return dispatch(ftpErrorList(error.message));
		}
	}
};

export const FtpDeleteRequest = (delete_id) => async (dispatch, getState) => {
	dispatch(setLoading());
	const toastId = toast.loading('Please wait your data is deleteing...');
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await FtpDeleteApi(delete_id, config);

		const { statusCode, error, errors, message } = data;
		if (error) {
			dispatch(ftpErrorList(errors));
		}
		if (statusCode === 200) {
			toast.success(message, {
				id: toastId,
			});
			dispatch(ftpDeleteData(data));
			dispatch(ftpGetData(data));
		}
	} catch (error) {
		const { statusCode, message } = error.response.data;
		if (statusCode === 422) {
			toast.error(message, {
				id: toastId,
			});
		}
	}
};
