import { lazy } from 'react';

const Authentication = [
	{
		path: '/login',
		exact: true,
		component: lazy(() => import('../../views/pages/authentication/Login')),
		layout: 'BlankLayout',
		meta: {
			authRoute: true,
		},
	},
	{
		path: '/register',
		exact: true,
		component: lazy(() => import('../../views/pages/authentication/Register')),
		layout: 'BlankLayout',
		meta: {
			authRoute: true,
		},
	},
	{
		path: '/forgot-password',
		exact: true,
		component: lazy(() => import('../../views/pages/authentication/ForgotPassword.js')),
		layout: 'BlankLayout',
		meta: {
			authRoute: true,
		},
	},
	{
		path: '/password-reset/:link',
		exact: true,
		component: lazy(() => import('../../views/pages/authentication/ResetPassword.js')),
		layout: 'BlankLayout',
		meta: {
			authRoute: true,
		},
	},
];

export default Authentication;
