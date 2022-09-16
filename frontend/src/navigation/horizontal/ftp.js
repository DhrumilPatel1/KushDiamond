import { Server } from 'react-feather';

export default [
	{
		id: 'ftp_setup',
		title: 'FTP Setup',
		icon: <Server size={20} />,
		// navLink: '/ftp/list',
		children: [
			{
				id: 'ftp',
				title: 'FTP',
				icon: <Server size={12} />,
				navLink: '/ftp/list',
			},
			{
				id: 'ftplog',
				title: 'FTP Log',
				icon: <Server size={20} />,
				navLink: '/ftplog/list',
			},
		],
	},
];
