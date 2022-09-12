import { Box, Home, Server } from 'react-feather';
import { NavLink } from 'react-router-dom';
const illustration = 1 ? 'image_main.png' : 'image_main.png',
	source = require(`@src/assets/images/logo/${illustration}`).default;
export default [
	{
		id: 'dashboard',
		title: 'Kush Diamond',
		icon: (
			<NavLink to="/" className="navbar-brand"  >
				<span className="brand-logo">
					<img className="img-fluid" style={{ width: '21px'}} src={source} alt="Login V2" />
				</span>
			</NavLink>
		),
	},
	{
		id: 'dashboard',
		title: 'Options',
		icon: <Home size={20} />,
		children: [
			{
				id: 'dashboard',
				title: 'Dashboard',
				icon: <Home size={20} />,
				navLink: '/dashboard',
			},
			{
				id: 'ftp',
				title: 'FTP',
				icon: <Server size={20} />,
				navLink: '/ftp/list',
			},
			{
				id: 'products',
				title: 'Products',
				icon: <Box size={20} />,
				navLink: '/products/list',
			},
		],
	},
];
