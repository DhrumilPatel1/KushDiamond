import { createSlice } from '@reduxjs/toolkit';
import { FtpLogListApi } from '../services/api';

export const FtpLogSlice = createSlice({
	name: 'FtpLog',
	initialState: {
		isLoading: false,
		ftpLogList: [],
		error: null,
	},
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},

		ftpLogData: (state, action) => {
			state.isLoading = false;
			state.ftpLogList = action.payload;
		},

		ftpLogErrorList: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

export const { ftpLogData, setLoading, ftpLogErrorList } = FtpLogSlice.actions;

export default FtpLogSlice.reducer;

export const FtpLogListRequest = (queryString) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await FtpLogListApi(queryString, config);

		dispatch(ftpLogData(data));
	} catch (error) {
		dispatch(ftpLogErrorList(error));
	}
};
