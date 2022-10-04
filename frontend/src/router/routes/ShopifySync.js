import { lazy } from 'react';

const ShopifySyncRoutes = [
	{
		path: '/shopifySync',
		exact: true,
		component: lazy(() => import('../../views/components/shopifySync/ShopifySync')),
	},
];

export default ShopifySyncRoutes;
