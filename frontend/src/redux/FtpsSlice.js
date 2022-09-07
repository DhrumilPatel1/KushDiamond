import { createSlice } from '@reduxjs/toolkit';
import { FtpCreateApi, FtpList } from '../services/api';

export const FtpsSlice = createSlice({
	name: 'Ftps',
	initialState: {
		isLoading: false,
		ftpData: null,
		ftpCreateData: [],
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
	},
});

export const { ftpGetData, ftpCreateData, setLoading, ftpErrorList } = FtpsSlice.actions;

export default FtpsSlice.reducer;

export const FtpClientList = (queryString) => async (dispatch) => {
	try {
		const { data } = await FtpList(queryString);
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
