import { lazy } from 'react';

const ProductesRoutes = [
	{
		path: '/products/list',
		exact: true,
		component: lazy(() => import('../../views/components/products/list')),
	},
	{
		path: '/products/add',
		component: lazy(() => import('../../views/components/products/AddProducts')),
	},
	{
		path: '/products/details/:id',
		component: lazy(() => import('../../views/components/products/ProductsDetail')),
	},
	{
		path: '/products/edit/:id',
		component: lazy(() => import('../../views/components/products/EditProducts')),
	},
];

export default ProductesRoutes;
