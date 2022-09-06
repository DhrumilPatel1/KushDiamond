import { lazy } from 'react';

const DashboardRoutes = [
	// {
	// 	path: '/admin/dashboard',
	// 	exact: true,
	// 	component: lazy(() => import('../../views/pages/dashboard/admin/index.js')),
	// },
	{
		path: '/dashboard',
		exact: true,
		component: lazy(() => import('../../views/pages/dashboard/list')),
	},
];

export default DashboardRoutes;
