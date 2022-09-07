import { createSlice } from '@reduxjs/toolkit';
import { FtpList} from '../services/api';


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
			console.log(action.payload,"action")
			state.isLoading = false;
			state.ftpData = action.payload;
		},
		
		ftpErrorList: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	
	},
});

export const { ftpGetData } = FtpsSlice.actions;

export default FtpsSlice.reducer;


export const FtpClientList = (queryString) => async (dispatch) => {
	try {
		const { data } = await FtpList(queryString);
		dispatch(ftpGetData(data));
	} catch (err) {
		dispatch(ftpErrorList(err));
	}
};
