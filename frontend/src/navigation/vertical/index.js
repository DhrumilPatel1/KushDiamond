// ** Navigation sections imports
import dashboards from './dashboards';
import ftp from './ftp';
import ftplog from './ftplog';
import products from './products';
import imageUpload from './imageUpload';

// ** Merge & Export
export default [...dashboards, ...ftp, ...ftplog, ...products, ...imageUpload];
