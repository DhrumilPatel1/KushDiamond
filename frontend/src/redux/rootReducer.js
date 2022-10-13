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
import ResetPassword from './ResetPasswordSlice';
import ShopifySync from './ShopifySyncSlice';
import ShopifySyncLog from './ShopifySyncLogSlice';

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
	ResetPassword,
	changePassword,
	ShopifySync,
	ShopifySyncLog,
};

export default rootReducer;
