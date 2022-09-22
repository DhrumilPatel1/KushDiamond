// ** Third Party Components
import FtpActionIcon from '../FtpActionIcon';

export const columns = [
	{
		name: 'Client Name',
		width: '230px',
		selector: 'client_name',
		sortable: true,
		cell: (row) => row.client_name,
	},
	{
		name: 'Hostname',
		width: '650px',
		selector: 'hostname',
		sortable: true,
		cell: (row) => row.hostname,
	},
	{
		name: 'Username',
		width: '250px',
		selector: 'Username',
		sortable: true,
		cell: (row) => row.username,
	},

	{
		name: 'Port',
		width: '150px',
		selector: 'port',
		sortable: true,
		cell: (row) => row.port,
	},
	// {
	// 	name: 'Password',
	// 	width: '400px',
	// 	selector: 'password',
	// 	sortable: true,
	// 	cell: (row) => row.password,
	// },

	{
		name: 'Actions',
		width: '110px',
		cell: (row) => {
			return (
				<div className="d-inline ">
					<FtpActionIcon id={row.id} />
				</div>
			);
		},
	},
];
