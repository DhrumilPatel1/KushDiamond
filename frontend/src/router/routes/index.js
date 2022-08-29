import DashboardRoutes from './Dashboards';
import AuthenticationRoutes from './Authentication';

// ** Document title
const TemplateTitle = 'OnCourseGlobal';

// ** Default Route
const DefaultRoute = '/dashboard';

// ** Merge Routes
const Routes = [...DashboardRoutes, ...AuthenticationRoutes];

export { DefaultRoute, TemplateTitle, Routes };
