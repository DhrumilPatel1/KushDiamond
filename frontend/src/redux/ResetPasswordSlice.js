import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { ResetPasswordApi } from '../services/api';

export const ResetPasswordSlice = createSlice({
	name: 'ResetPassword',
	initialState: {
		isLoading: false,
		ResetPasswordData: [],
		error: null,
	},
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},

		ResetPasswordList: (state, action) => {
			state.isLoading = false;
			state.ResetPasswordData = action.payload;
		},

		ResetpasswordErrorList: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},

		ResetpasswordResetData: (state) => {
			state.isLoading = false;
			state.error = null;
			state.ResetPasswordData = [];
		},
	},
});

export const {
	ResetPasswordList,
	setLoading,
	ResetpasswordErrorList,
	ResetpasswordResetData,
	changepasswordResetData,
} = ResetPasswordSlice.actions;

export default ResetPasswordSlice.reducer;

export const ResetPasswordRequest = (resetPassword, link) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};

		const { data } = await ResetPasswordApi(resetPassword, link, config);

		const { statusCode, message } = data;
		if (statusCode === 200) {
			dispatch(ResetPasswordList(data));
			toast.success(message);
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			dispatch(ResetpasswordErrorList(error.response.data.errors));
		} else {
			dispatch(ResetpasswordErrorList(error.message));
		}
	}
};
