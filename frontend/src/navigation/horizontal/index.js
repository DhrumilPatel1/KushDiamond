// ** Navigation sections imports
import apps from './apps';
import pages from './pages';
import others from './others';
import dashboards from './dashboards';
import uiElements from './ui-elements';
import formsAndTables from './forms-tables';
import chartsAndMaps from './charts-maps';
import ftp from './ftp';
import products from './products';
import ftplog from './ftplog';
import imageUpload from './imageUpload';
import user from './user';

// ** Merge & Export
export default [
	...dashboards,
	...ftp,
	// ...ftplog,
	...products,
	...user,
	// ...imageUpload,
	// ...others,
	// ...pages,
	// ...apps,
];
