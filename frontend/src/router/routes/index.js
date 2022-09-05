import DashboardRoutes from './Dashboards';
import AuthenticationRoutes from './Authentication';
import ProductesRoutes from './Products';

// ** Document title
const TemplateTitle = 'Kush Diamond';

// ** Default Route
const DefaultRoute = '/dashboard';

// ** Merge Routes
const Routes = [...DashboardRoutes, ...AuthenticationRoutes, ...ProductesRoutes];

export { DefaultRoute, TemplateTitle, Routes };
