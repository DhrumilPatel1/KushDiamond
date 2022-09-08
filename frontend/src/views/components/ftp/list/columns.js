// ** React Imports
import { Link } from 'react-router-dom';

// ** Third Party Components

import { Trash2, Eye, Edit } from 'react-feather';

const handleDeleteById = (id) => {
	console.log(id, 'id');
};

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
		minWidth: '110px',
		selector: 'port',
		sortable: true,
		cell: (row) => row.port,
	},
	{
		name: 'Password',
		minWidth: '110px',
		selector: 'password',
		sortable: true,
		cell: (row) => row.password,
	},

	{
		name: 'Actions',
		minWidth: '100px',
		cell: (row) => {
			return (
				<div className="d-inline ">
					<Link to={`/admin/instructions/view/${row.id}`} className="text-primary">
						<Eye size={18} />
					</Link>

					<Link to={`/admin/instructions/edit/${row.id}`} className="text-warning mx-1">
						<Edit size={18} />
					</Link>

					<Trash2
						className="text-danger"
						size={18}
						onClick={() => handleDeleteById(row.id)}
						style={{ cursor: 'pointer' }}
					/>
				</div>
			);
		},
	},
];
