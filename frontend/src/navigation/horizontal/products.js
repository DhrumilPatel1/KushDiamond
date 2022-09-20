import { Box, Image, Package, Server } from 'react-feather';

export default [
	{
		id: 'products',
		title: 'Products',
		icon: <Box size={20} />,
		// navLink: '/products/list',
		children: [
			{
				id: 'image_upload',
				title: 'Image Upload',
				icon: <Image size={20} />,
				navLink: '/uploadImage',
			},
			{
				id: 'products list',
				title: 'Products List',
				icon: <Package size={12} />,
				navLink: '/products/list',
			},
		],
	},
];
