// ** React Imports
import { Link } from 'react-router-dom';

// ** Third Party Components
import {
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Badge,
} from 'reactstrap';
import { MoreVertical, Trash2, Eye, Edit } from 'react-feather';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Renders Client Columns
const renderClient = (row) => {
	const stateNum = Math.floor(Math.random() * 6),
		states = [
			'light-success',
			'light-danger',
			'light-warning',
			'light-info',
			'light-primary',
			'light-secondary',
		],
		color = states[stateNum];

	if (row.client_name) {
		return (
			<Avatar
				color={color || 'primary'}
				className="mr-1"
				content={row.client_name || ''}
				initials
			/>
		);
	}
};

const handleDeleteById = (id) => {
	console.log(id,"id")
};

export const columns = [
	{
		name: 'Client Name',
		minWidth: '190px',
		selector: 'client_name',
		sortable: true,
		cell: (row) => (
			<div className="d-flex justify-content-left align-items-center">
				{renderClient(row)}
				<div className="d-flex flex-column">
					<span className="font-weight-bold">{row.client_name}</span>
				</div>
			</div>
		),
	},
	{
		name: 'Protocol',
		minWidth: '140px',
		selector: 'protocol',
		sortable: true,
		cell: (row) => row.protocol,
	},
	{
		name: 'Port',
		minWidth: '110px',
		selector: 'port',
		sortable: true,
		cell: (row) => row.port,
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
		name: 'Actions',
		minWidth: '25%',
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
		// sortable: true,
	},

	// {
	// 	name: 'Actions',
	// 	minWidth: '80px',
	// 	cell: (row) => (
	// 		<UncontrolledDropdown>
	// 			<DropdownToggle tag="div" className="btn btn-sm">
	// 				<MoreVertical size={14} className="cursor-pointer" />
	// 			</DropdownToggle>
	// 			<DropdownMenu right>
	// 				<DropdownItem
	// 					tag={Link}
	// 					to={`/apps/user/view/${row.id}`}
	// 					className="w-100"
	// 					// onClick={() => store.dispatch(getUser(row.id))}
	// 				>
	// 					<Eye size={14} className="mr-50" />
	// 					<span className="align-middle">Details</span>
	// 				</DropdownItem>
	// 				<DropdownItem
	// 					tag={Link}
	// 					to={`/apps/user/edit/${row.id}`}
	// 					className="w-100"
	// 					// onClick={() => store.dispatch(getUser(row.id))}
	// 				>
	// 					<Edit size={14} className="mr-50" />
	// 					<span className="align-middle">Edit</span>
	// 				</DropdownItem>
	// 				<DropdownItem
	// 					className="w-100"
	// 					// onClick={() => store.dispatch(deleteUser(row.id))}
	// 				>
	// 					<Trash2 size={14} className="mr-50" />
	// 					<span className="align-middle">Delete</span>
	// 				</DropdownItem>
	// 			</DropdownMenu>
	// 		</UncontrolledDropdown>
	// 	),
	// },
];
