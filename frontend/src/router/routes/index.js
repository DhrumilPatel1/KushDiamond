import DashboardRoutes from './Dashboards';
import AuthenticationRoutes from './Authentication';
import ProductesRoutes from './Products';
import FtpRoutes from './Ftp';
import FtpLogRoutes from './FtpLog';

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
];

export { DefaultRoute, TemplateTitle, Routes };
