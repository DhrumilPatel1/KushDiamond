import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
// import useJwt from '@src/auth/jwt/useJwt';
import { AdminLoginAPI } from '../services/api';

// const config = useJwt.jwtConfig;

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isLoading: false,
		userData: null,
		error: null,
	},
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		handleSuccessLogin: (state, action) => {
			state.isLoading = false;
			state.userData = action.payload?.data;
			localStorage.setItem('userData', JSON.stringify(action.payload?.data));
			localStorage.setItem('accessToken', JSON.stringify(action.payload?.token.access));
		},
		handleErrorLogin: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleLogout: (state) => {
			state.isLoading = false;
			state.error = null;
			state.userData = null;
			localStorage.clear();
		},
		handleResetAuth: (state) => {
			state.isLoading = false;
			state.error = null;
			state.userData = null;
		},
	},
});

export const { handleSuccessLogin, handleErrorLogin, setLoading, handleLogout, handleResetAuth } =
	authSlice.actions;

export default authSlice.reducer;

export const AdminLoginRequest = (userData) => async (dispatch) => {
	dispatch(setLoading());
	try {
		const { data } = await AdminLoginAPI(userData);
		const { statusCode, error, errors } = data;
		if (error) {
			dispatch(handleErrorLogin(errors));
		}
		if (statusCode === 200) {
			dispatch(handleSuccessLogin(data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			// toast.error(error.response.data.errors.username || error.response.data.errors.password);
			return dispatch(handleErrorLogin(error.response.data.errors));
		} else {
			return dispatch(handleErrorLogin(error.message));
		}
	}
};
