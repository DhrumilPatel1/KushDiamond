// ** Reducers Imports
import layout from './layoutSlice';
import navbar from './navbarSlice';
import auth from './authSlice';
import products from './productsSlice';
import Ftps from './FtpsSlice';

const rootReducer = { navbar, layout, auth, products, Ftps };

export default rootReducer;
