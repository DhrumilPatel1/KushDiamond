import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { ChangePasswordApi } from '../services/api';

export const ChangePasswordSlice = createSlice({
	name: 'changePassword',
	initialState: {
		isLoading: false,
		changePasswordData: [],
		error: null,
	},
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},

		changePasswordList: (state, action) => {
			console.log(action.payload, 'action.payload');
			state.isLoading = false;
			state.changePasswordData = action.payload;
		},

		changepasswordErrorList: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},

		changepasswordResetData: (state) => {
			state.isLoading = false;
			state.error = null;
			state.changePasswordData = [];
		},
	},
});

export const { changePasswordList, setLoading, changepasswordErrorList, changepasswordResetData } =
	ChangePasswordSlice.actions;

export default ChangePasswordSlice.reducer;

export const ChangePasswordRequest = (changePassword) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};

		const { data } = await ChangePasswordApi(changePassword, config);

		dispatch(changePasswordList(data));
	} catch (error) {
		if (error.response && error.response.data.errors) {
			dispatch(changepasswordErrorList(error.response.data.errors));
		} else {
			dispatch(changepasswordErrorList(error.message));
		}
	}
};
