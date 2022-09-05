// ** Reducers Imports
import layout from './layoutSlice';
import navbar from './navbarSlice';
import auth from './authSlice';
import products from './productsSlice';

const rootReducer = { navbar, layout, auth,products };

export default rootReducer;
