import { createSlice } from '@reduxjs/toolkit';
import { mediaLogApi } from '../services/api';

export const mediaLogSlice = createSlice({
	name: 'mediaLog',
	initialState: {
		isLoading: false,
		mediaLogList: [],
		error: null,
	},
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},

		mediaLogData: (state, action) => {
			state.isLoading = false;
			state.mediaLogList = action.payload;
		},

		mediaLogErrorList: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

export const { mediaLogData, setLoading, mediaLogErrorList } = mediaLogSlice.actions;

export default mediaLogSlice.reducer;

export const mediaLogListRequest = (queryString) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await mediaLogApi(queryString, config);
		dispatch(mediaLogData(data));
	} catch (error) {
		dispatch(mediaLogErrorList(error.response));
	}
};
