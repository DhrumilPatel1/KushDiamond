import { lazy } from 'react';

const ProductesRoutes = [
	{
		path: '/products/list',
		exact: true,
		component: lazy(() => import('../../views/components/products/list')),
	},
];

export default ProductesRoutes;
