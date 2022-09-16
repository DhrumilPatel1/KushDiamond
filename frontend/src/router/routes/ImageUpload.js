import { lazy } from 'react';

const ImageUploadRoutes = [
	{
		path: '/uploadImage',
		exact: true,
		component: lazy(() => import('../../views/components/imageUpload/ImagesUpload')),
	},
];

export default ImageUploadRoutes;
