import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { UserCreateApi, UserGetAllApi } from '../services/api';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		isLoading: false,
		userList: [],
		userCreateData: [],
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

		userAddList: (state, action) => {
			state.isLoading = false;
			state.userCreateData = action.payload?.data;
		},

		userErrorList: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		},

		userResetAuth: (state) => {
			state.isLoading = false;
			state.error = null;
			state.userCreateData = [];
		},
	},
});

export const { userAddList, userGetData, userResetAuth, userErrorList, setLoading } =
	userSlice.actions;

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

export const UserCreateRequest = (userData) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};

		const { data } = await UserCreateApi(userData, config);

		const { statusCode, message } = data;

		if (statusCode === 201) {
			toast.success(message);
			dispatch(userAddList(data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(userErrorList(error.response.data.errors));
		} else {
			return dispatch(userErrorList(error.message));
		}
	}
};
