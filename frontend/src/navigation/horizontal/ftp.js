import { Server } from 'react-feather';

export default [
	{
		id: 'ftp',
		title: 'FTP',
		icon: <Server size={20} />,
		// navLink: '/ftp/list',
		children: [
			{
				id: 'ftp_list',
				title: 'FTP List',
				icon: <Server size={12} />,
				navLink: '/ftp/list',
			},
			{
				id: 'ftplog',
				title: 'FTP Log',
				icon: <Server size={20} />,
				navLink: '/ftplog/list',
			},
			{
				id: 'ftpfeed',
				title: 'FTP Feed',
				icon: <Server size={20} />,
				navLink: '/ftpfeed/list',
			},
		],
	},
];
