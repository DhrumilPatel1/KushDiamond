import { lazy } from 'react';

const ProductesRoutes = [
	{
		path: '/products/list',
		exact: true,
		component: lazy(() => import('../../views/components/products/list')),
	},
	{
		path: '/products/add',
		component: lazy(() => import('../../views/components/products/CreateProducts')),
	},
];

export default ProductesRoutes;
