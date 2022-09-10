// ** Third Party Components
import FtpActionIcon from '../FtpActionIcon';

export const columns = [
	{
		name: 'Client Name',
		minWidth: '210px',
		selector: 'client_name',
		sortable: true,
		cell: (row) => row.client_name,
	},
	{
		name: 'Hostname',
		minWidth: '250px',
		selector: 'hostname',
		sortable: true,
		cell: (row) => row.hostname,
	},
	{
		name: 'Username',
		minWidth: '170px',
		selector: 'Username',
		sortable: true,
		cell: (row) => row.username,
	},

	{
		name: 'Port',
		width: '60px',
		selector: 'port',
		sortable: true,
		cell: (row) => row.port,
	},
	{
		name: 'Password',
		minWidth: '200px',
		selector: 'password',
		sortable: true,
		cell: (row) => row.password,
	},

	{
		name: 'Actions',
		// minWidth: '100px',
		cell: (row) => {
			return (
				<div className="d-inline ">
					<FtpActionIcon id={row.id} />
				</div>
			);
		},
	},
];
