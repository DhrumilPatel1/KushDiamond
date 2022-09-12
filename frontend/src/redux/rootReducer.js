// ** Reducers Imports
import layout from './layoutSlice';
import navbar from './navbarSlice';
import auth from './authSlice';
import products from './productsSlice';
import Ftps from './FtpsSlice';
import FtpLog from './FtpLogSlice';

const rootReducer = { navbar, layout, auth, products, Ftps, FtpLog };

export default rootReducer;
