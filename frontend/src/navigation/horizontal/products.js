import { Box, File, Image, Package, Server, ShoppingBag } from 'react-feather';

export default [
	{
		id: 'products',
		title: 'Products',
		icon: <Box size={20} />,
		// navLink: '/products/list',
		children: [
			{
				id: 'All products',
				title: 'All products',
				icon: <Package size={12} />,
				navLink: '/products/list',
			},

			{
				id: 'Product Excel',
				title: 'Product Excel',
				icon: <File size={20} />,
				navLink: '/product/excel',
			},

			{
				id: 'image_upload',
				title: 'Image Upload',
				icon: <Image size={20} />,
				navLink: '/uploadImage',
			},

			{
				id: 'Inventory Excel',
				title: 'Inventory Excel',
				icon: <File size={20} />,
				navLink: '/product/inventory',
			},

			{
				id: 'excel_log',
				title: 'Excel Upload Log',
				icon: <File size={20} />,
				navLink: '/excelLog/list',
			},

			{
				id: 'shopify_sync',
				title: 'Shopify Sync',
				icon: <ShoppingBag size={20} />,
				navLink: '/shopifySync',
			},
		],
	},
];
