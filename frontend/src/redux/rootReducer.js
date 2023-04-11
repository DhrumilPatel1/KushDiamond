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
import Dashboard from './DashboardSlice';
import ShopifySyncLog from './ShopifySyncLogSlice';
import mediaLog from './mediaLogSlice';

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
	ShopifySyncLog,
	ResetPassword,
	changePassword,
	ShopifySync,
	mediaLog,
	Dashboard,
};

export default rootReducer;
