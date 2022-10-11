import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { UserCreateApi, UserDeleteApi, UserGetAllApi, UserViewApi } from '../services/api';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		isLoading: false,
		userList: [],
		userCreateData: [],
		userDeleteData: [],
		userViewData:[],
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
		userViewData: (state, action) => {
			state.isLoading = false;
			state.userViewData = action.payload?.data;
		},


		userAddList: (state, action) => {
			state.isLoading = false;
			state.userCreateData = action.payload?.data;
		},

		userDeleteList: (state, action) => {
			state.isLoading = false;
			state.userDeleteData = action.payload;
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

export const {
	userAddList,
	userGetData,
	userResetAuth,
	userDeleteList,
	userErrorList,
	setLoading,
	userViewData,
} = userSlice.actions;

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





export const UserViewRequest = (userid) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await UserViewApi(userid, config);
		console.log(data,"data api")

			dispatch(userViewData(data));
	
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(userErrorList(error.response.data.errors));
		} else {
			return dispatch(userErrorList(error.message));
		}
	}
};



export const UserDeleteRequest = (deleteId) => async (dispatch, getState) => {
	dispatch(setLoading());
	const toastId = toast.loading('Please wait your data is deleteing...');
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: getState()?.auth?.Token,
			},
		};
		const { data } = await UserDeleteApi(deleteId, config);

		const { statusCode, error, errors, message } = data;
		if (statusCode === 200) {
			toast.success(message, {
				id: toastId,
			});
			dispatch(userDeleteList(data));
			dispatch(UserListRequest(data));
		}
	} catch (error){
		const { statusCode, message } = error.response.data;
		if (statusCode === 422){
			toast.error(message, {
				id: toastId,
			});
		}
	}
};
