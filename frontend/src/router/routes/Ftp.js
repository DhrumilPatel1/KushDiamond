import { lazy } from 'react';

const FtpRoutes = [
	{
		path: '/ftp/list',
		exact: true,
		component: lazy(() => import('../../views/components/ftp/list')),
	},
	{
		path: '/ftp/add',
		component: lazy(() => import('../../views/components/ftp/CreateFtp')),
	},
];

export default FtpRoutes;
