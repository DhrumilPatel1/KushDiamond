import { createSlice } from '@reduxjs/toolkit';
import { FtpCreateApi, FtpListApi } from '../services/api';

export const FtpsSlice = createSlice({
	name: 'Ftps',
	initialState: {
		isLoading: false,
		ftpData: [],
		ftpCreateData: null,
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

		ftpCreateData: (state, action) => {
			state.isLoading = false;
			state.ftpCreateData = action.payload?.data;
		},

		ftpErrorList: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},

		ftpDeleteData: (state, action) => {
			state.isLoading = false;
			state.ftpDeleteData = action.payload?.data;
		},

		ftpResetAuth: (state) => {
			state.isLoading = false;
			state.error = null;
			state.ftpCreateData = null;
		},
	},
});

export const { ftpGetData, ftpCreateData, setLoading, ftpErrorList, ftpDeleteData, ftpResetAuth } =
	FtpsSlice.actions;

export default FtpsSlice.reducer;

export const FtpClientList = (queryString) => async (dispatch) => {
	dispatch(setLoading());
	try {
		const { data } = await FtpListApi(queryString);

		dispatch(ftpGetData(data));
	} catch (err) {
		dispatch(ftpErrorList(err));
	}
};

export const FtpCreateRequest = (ftpData) => async (dispatch) => {
	dispatch(setLoading());
	try {
		const { data } = await FtpCreateApi(ftpData);

		const { statusCode, error, errors } = data;
		if (error) {
			dispatch(ftpErrorList(errors));
		}
		if (statusCode === 201) {
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

export const FtpDeleteRequest = (delete_id) => async (dispatch) => {
	console.log(delete_id, 'delete_id');
	dispatch(setLoading());
	try {
		const { data } = await FtpDeleteApi(delete_id);
		const { statusCode, error, errors } = data;
		console.log(statusCode, 'statusCode');

		if (statusCode === 201) {
			dispatch(ftpDeleteData(data));
		}
	} catch (error) {
		// if (error.response && error.response.data.errors) {
		// 	return dispatch(ftpErrorList(error.response.data.errors));
		// } else {
		// 	return dispatch(ftpErrorList(error.message));
		// }
	}
};
