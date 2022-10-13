import { lazy } from 'react';

const ShopifySyncLogRoutes = [
	{
		path: '/shopifySyncLog/list',
		exact: true,
		component: lazy(() => import('../../views/components/shopifySyncLog/list')),
	},
];

export default ShopifySyncLogRoutes;
