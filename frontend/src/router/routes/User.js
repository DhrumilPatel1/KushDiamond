import { lazy } from 'react';

const UserRoutes = [
	{
		path: '/user/list',
		exact: true,
		component: lazy(() => import('../../views/components/user/list')),
	},
	{
		path: '/user/add',
		component: lazy(() => import('../../views/components/user/CreateUser')),
	},
	// {
	// 	path: '/user/add',
	// 	component: lazy(() => import('../../views/components/ftp/CreateFtp')),
	// },
];

export default UserRoutes;
