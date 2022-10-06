// ** Third Party Components
import UserActionIcon from '../UserActionIcon';

export const columns = [
	{
		name: 'User Name',
		width: '230px',
		selector: 'username',
		sortable: true,
		cell: (row) => row.username,
	},
	{
		name: 'Email',
		width: '450px',
		selector: 'email',
		sortable: true,
		cell: (row) => row.email,
	},
	{
		name: 'Mobile No',
		width: '250px',
		selector: 'mobile_no',
		sortable: true,
		cell: (row) => row.mobile_no,
	},

	{
		name: 'Actions',
		width: '110px',
		center: true,
		cell: (row) => {
			return (
				<div className="d-inline ">
					<UserActionIcon id={row.id} />
				</div>
			);
		},
	},
];
