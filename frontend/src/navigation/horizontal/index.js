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


// ** Merge & Export
export default [
	...dashboards,
	...ftp,
	 ...products,
	// ...others,
	// ...pages,
	// ...apps,
	
];
