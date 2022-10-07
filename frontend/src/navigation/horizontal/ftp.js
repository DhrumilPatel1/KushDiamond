import { Cast, FileText, Server, Table } from 'react-feather';

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
				icon: <Table size={12} />,
				navLink: '/ftp/list',
			},

			{
				id: 'ftp_feed',
				title: 'FTP Feed',
				icon: <Cast size={20} />,
				navLink: '/ftpfeed/list',
			},

			{
				id: 'ftp_fee_log',
				title: 'FTP Feed Log',
				icon: <FileText size={20} />,
				navLink: '/ftplog/list',
			},
		],
	},
];
