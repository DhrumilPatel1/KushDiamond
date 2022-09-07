import { createSlice } from '@reduxjs/toolkit';
import { FtpListApi } from '../services/api';

export const FtpsSlice = createSlice({
	name: 'Ftps',
	initialState: {
		isLoading: false,
		ftpData: [],
		excelTypeOne: [],
		error: null,
	},
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		ftpGetData: (state, action) => {
			console.log(action.payload, 'action');
			state.isLoading = false;
			state.ftpData = action.payload;
		},

		ftpErrorList: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

export const { ftpGetData, setLoading } = FtpsSlice.actions;
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
