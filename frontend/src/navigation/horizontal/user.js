import { User, Users } from 'react-feather';

export default [
	{
		id: 'user',
		title: 'User',
		icon: <Users size={20} />,
		children: [
			{
				id: 'user_list',
				title: 'User List',
				icon: <User size={12} />,
				navLink: '/user/list',
			},
		],
	},
];
