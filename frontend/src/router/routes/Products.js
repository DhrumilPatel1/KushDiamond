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
		path: '/products/detail/:id',
		component: lazy(() => import('../../views/components/products/ProductsDetail')),
	},
	{
		path: '/products/edit/:id',
		component: lazy(() => import('../../views/components/products/EditProducts')),
	},
	{
		path: '/mediaLog/list',
		component: lazy(() => import('../../views/components/mediaLog/list')),
	},
	// {
	// 	path: '/products/view/:id',
	// 	component: lazy(() => import('../../views/components/products/list/ProductView-old')),
	// },
];

export default ProductesRoutes;
