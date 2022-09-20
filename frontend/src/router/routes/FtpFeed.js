import { lazy } from 'react';

const FtpFeedRoutes = [
	{
		path: '/ftpfeed/list',
		exact: true,
		component: lazy(() => import('../../views/components/ftpfeed/list')),
	},
];

export default FtpFeedRoutes;
