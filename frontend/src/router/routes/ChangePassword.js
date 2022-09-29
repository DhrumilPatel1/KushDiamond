import { lazy } from 'react';

const ChangePasswordRoutes = [
	{
		path: '/changePassword',
		exact: true,
		component: lazy(() => import('../../views/components/changePassword/ChangePassword')),
	},
];

export default ChangePasswordRoutes;
