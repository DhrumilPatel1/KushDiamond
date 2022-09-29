import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { UserGetAllApi } from '../services/api';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		isLoading: false,
		userList: [],
		error: null,
	},
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},

		userGetData: (state, action) => {
			state.isLoading = false;
			state.userList = action.payload;
		},

		userErrorList: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},

		userResetAuth: (state) => {
			state.isLoading = false;
			state.error = null;
		},
	},
});

export const { userGetData, userResetAuth, userErrorList, setLoading } = userSlice.actions;

export default userSlice.reducer;

export const UserListRequest = (queryString) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await UserGetAllApi(queryString, config);

		dispatch(userGetData(data));
	} catch (err) {
		dispatch(userErrorList(err));
	}
};
