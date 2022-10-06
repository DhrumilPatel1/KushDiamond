import { User, Users } from 'react-feather';

export default [
	{
		id: 'user_staff',
		title: 'User Staff',
		icon: <Users size={20} />,
		children: [
			{
				id: 'user_list',
				title: 'All User List',
				icon: <User size={12} />,
				navLink: '/user/list',
			},
		],
	},
];
