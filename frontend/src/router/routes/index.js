import DashboardRoutes from './Dashboards';
import AuthenticationRoutes from './Authentication';
import ProductesRoutes from './Products';
import FtpRoutes from './Ftp';
import FtpLogRoutes from './FtpLog';
import ImageUploadRoutes from './ImageUpload';
import FtpFeedRoutes from './FtpFeed';
import ExcelLogRoutes from './ExcelLog';
import ProductExcel from './ProductExcel';
import UserRoutes from './User';
import ChangePasswordRoutes from './ChangePassword';
import ShopifySyncRoutes from './ShopifySync';
import ShopifySyncLogRoutes from './ShopifySyncLog';

// ** Document title
const TemplateTitle = 'Kush Diamond';

// ** Default Route
const DefaultRoute = '/dashboard';

// ** Merge Routes
const Routes = [
	...DashboardRoutes,
	...ChangePasswordRoutes,
	...AuthenticationRoutes,
	...ProductesRoutes,
	...ProductExcel,
	...ExcelLogRoutes,
	...FtpRoutes,
	...FtpLogRoutes,
	...FtpFeedRoutes,
	...ImageUploadRoutes,
	...UserRoutes,
	...ShopifySyncRoutes,
	...ShopifySyncLogRoutes,
];

export { DefaultRoute, TemplateTitle, Routes };
