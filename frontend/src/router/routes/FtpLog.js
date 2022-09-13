import { lazy } from 'react';

const FtpLogRoutes = [
	{
		path: '/ftplog/list',
		exact: true,
		component: lazy(() => import('../../views/components/ftplog/list')),
	},
];

export default FtpLogRoutes;
