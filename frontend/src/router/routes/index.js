import DashboardRoutes from './Dashboards';
import AuthenticationRoutes from './Authentication';
import ProductesRoutes from './Products';
import FtpRoutes from './Ftp';
import FtpLogRoutes from './FtpLog';
import ImageUploadRoutes from './ImageUpload';
import FtpFeedRoutes from './FtpFeed';
import ExcelLogRoutes from './ExcelLog';

// ** Document title
const TemplateTitle = 'Kush Diamond';

// ** Default Route
const DefaultRoute = '/dashboard';

// ** Merge Routes
const Routes = [
	...DashboardRoutes,
	...AuthenticationRoutes,
	...ProductesRoutes,
	...ExcelLogRoutes,
	...FtpRoutes,
	...FtpLogRoutes,
	...FtpFeedRoutes,
	...ImageUploadRoutes,
];

export { DefaultRoute, TemplateTitle, Routes };
