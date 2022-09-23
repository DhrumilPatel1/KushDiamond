import { createSlice } from '@reduxjs/toolkit';
import { ExcelLogListApi } from '../services/api';

export const ExcelLogSlice = createSlice({
	name: 'ExcelLog',
	initialState: {
		isLoading: false,
		excelLogList: [],
		error: null,
	},
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},

		excelLogData: (state, action) => {
			state.isLoading = false;
			state.excelLogList = action.payload;
		},

		excelLogErrorList: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

export const { setLoading, excelLogData, excelLogErrorList } = ExcelLogSlice.actions;

export default ExcelLogSlice.reducer;

export const ExcelLogListRequest = (queryString) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await ExcelLogListApi(queryString, config);

		dispatch(excelLogData(data));
	} catch (error) {
		dispatch(excelLogErrorList(error));
	}
};
