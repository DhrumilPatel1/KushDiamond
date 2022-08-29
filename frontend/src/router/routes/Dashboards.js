import { lazy } from 'react';

const DashboardRoutes = [
	{
		path: '/admin/dashboard',
		exact: true,
		// appLayout: true,
		component: lazy(() => import('../../views/pages/dashboard/admin/index.js')),
	},
	{
		path: '/dashboard',
		exact: true,
		layout: 'BlankLayout',
		component: lazy(() => import('../../views/pages/dashboard/student/index.js')),
	},
];

export default DashboardRoutes;
