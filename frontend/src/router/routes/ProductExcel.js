import { lazy } from 'react';
const ProductExcel = [
	{
		path: '/product/excel',
		exact: true,
		component: lazy(() => import('../../views/components/products/productExcel/ProductExcelTypeOne')),
	},
	{
		path: '/product/inventory',
		exact: true,
		component: lazy(() => import('../../views/components/products/productExcel/productInventory')),
	},
];

export default ProductExcel;
