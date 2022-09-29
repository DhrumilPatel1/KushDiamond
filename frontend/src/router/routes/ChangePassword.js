import { lazy } from 'react';


const ChangePasswordRoutes = [
	{
		path: '/changePassword',
		exact: true,
		component: lazy(() => import('../../views/pages/authentication/ChangePassword')),
	},
];

export default ChangePasswordRoutes;
