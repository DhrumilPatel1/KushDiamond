import { lazy } from 'react';

const DashboardRoutes = [
	{
		path: '/dashboard',
		exact: true,
		component: lazy(() => import('../../views/pages/dashboard/list')),
	},
];

export default DashboardRoutes;
