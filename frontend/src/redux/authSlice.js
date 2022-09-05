import { createSlice } from '@reduxjs/toolkit';
// import useJwt from '@src/auth/jwt/useJwt';
import { AdminLoginAPI } from '../services/api';

// const config = useJwt.jwtConfig;

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isLoading: false,
		userData: null,
		abilityData: null,
		error: null,
	},
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		handleSuccessLogin: (state, action) => {
			console.log(action.payload,"payload")

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
	dispatch(setLoading(true));
	try {
		const { data } = await AdminLoginAPI(userData);


		const { statusCode, error, errors } = data;

		if (error) {
			dispatch(handleErrorLogin(errors));
		}
		if (statusCode === 200) {
			dispatch(handleSuccessLogin(data));
		}
	} catch (err) {
		dispatch(handleErrorLogin(err));
	}
};
