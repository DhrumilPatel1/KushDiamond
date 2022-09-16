import DashboardRoutes from './Dashboards';
import AuthenticationRoutes from './Authentication';
import ProductesRoutes from './Products';
import FtpRoutes from './Ftp';
import FtpLogRoutes from './FtpLog';
import ImageUploadRoutes from './ImageUpload';

// ** Document title
const TemplateTitle = 'Kush Diamond';

// ** Default Route
const DefaultRoute = '/dashboard';

// ** Merge Routes
const Routes = [
	...DashboardRoutes,
	...AuthenticationRoutes,
	...ProductesRoutes,
	...FtpRoutes,
	...FtpLogRoutes,
	...ImageUploadRoutes,
];

export { DefaultRoute, TemplateTitle, Routes };
