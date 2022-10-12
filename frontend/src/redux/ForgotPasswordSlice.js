import { createSlice } from '@reduxjs/toolkit';
import { ForgotPasswordAPI } from '../services/api';
import toast from 'react-hot-toast';

export const ForgotPasswordSlice = createSlice({
	name: 'forgotPassword',
	initialState: {
		isLoading: false,
		forgotPasswordData: [],
		error: null,
	},
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},

		forgotPasswordLink: (state, action) => {
			state.isLoading = false;
			state.forgotPasswordData = action.payload;
		},

		forgotpasswordErrorList: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},

		forgotpasswordResetData: (state) => {
			state.isLoading = false;
			state.error = null;
			state.forgotPasswordData = [];
		},
	},
});

export const { forgotPasswordLink, setLoading, forgotpasswordErrorList, forgotpasswordResetData } =
	ForgotPasswordSlice.actions;

export default ForgotPasswordSlice.reducer;

export const ForgotPasswordLinkRequest = (forgotlink) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await ForgotPasswordAPI(forgotlink, config);
		dispatch(forgotPasswordLink(data));
	} catch (error) {
		if (error.response && error.response.data.errors) {
			dispatch(forgotpasswordErrorList(error.response.data.errors));
		} else if (error.response.status === 500) {
			dispatch(forgotpasswordErrorList(error.response.statusText));
			toast.error(error.response.statusText);
		} else {
			dispatch(forgotpasswordErrorList(error.response.data.message));
			toast.error(error.response.data.message);
		}
	}
};
