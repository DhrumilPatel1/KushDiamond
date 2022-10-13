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
<<<<<<< HEAD
import ShopifySyncLog from './ShopifySyncLogSlice';
=======
import Dashboard from './DashboardSlice';
>>>>>>> 6c4150a438f320fbdc0134bf00431e4023a48509

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
<<<<<<< HEAD
	ShopifySyncLog,
=======
	Dashboard
>>>>>>> 6c4150a438f320fbdc0134bf00431e4023a48509
};

export default rootReducer;
