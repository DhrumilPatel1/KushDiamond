// ** Reducers Imports
import layout from './layoutSlice';
import navbar from './navbarSlice';
import auth from './authSlice';
import products from './productsSlice';
import Ftps from './FtpsSlice';
import FtpLog from './FtpLogSlice';
import ExcelLog from './ExcelLogSlice';

const rootReducer = { navbar, layout, auth, products, Ftps, FtpLog, ExcelLog };

export default rootReducer;
