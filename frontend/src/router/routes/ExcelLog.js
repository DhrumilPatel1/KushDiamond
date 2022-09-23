import { lazy } from 'react';

const ExcelLogRoutes = [
	{
		path: '/excelLog/list',
		exact: true,
		component: lazy(() => import('../../views/components/excellog/list')),
	},
];

export default ExcelLogRoutes;
