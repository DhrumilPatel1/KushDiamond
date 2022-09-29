// ** Reducers Imports
import layout from './layoutSlice';
import navbar from './navbarSlice';
import auth from './authSlice';
import products from './productsSlice';
import Ftps from './FtpsSlice';
import FtpLog from './FtpLogSlice';
import ExcelLog from './ExcelLogSlice';
import forgotPassword from './ForgotPasswordSlice';
import user from './userSlice';
import changePassword from './ChagePasswordSlice';

const rootReducer = {
	navbar,
	layout,
	auth,
	forgotPassword,
	products,
	Ftps,
	FtpLog,
	ExcelLog,
	user,
	changePassword,
};

export default rootReducer;
