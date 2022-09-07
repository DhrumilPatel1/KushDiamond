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

const statusObj = {
	active: 'light-success',
	inactive: 'light-warning',
};



export const columns = [
	{
		name: 'Client Name',
		minWidth: '190px',
		selector: 'client_name',
		sortable: true,
		cell: (row) => row.client_name,
	},
	{
		name: 'Protocol',
		minWidth: '130px',
		selector: 'Protocol',
		sortable: true,
		cell: (row) => row.protocol,
	},
	{
		name: 'Port',
		minWidth: '90px',
		selector: 'Port',
		sortable: true,
		cell: (row) => row.port,
	},
	{
		name: 'Hostname',
		minWidth: '170px',
		selector: 'Hostname',
		sortable: true,
		cell: (row) => row.hostname,
	},
	{
		name: 'Username',
		minWidth: '210px',
		selector: 'Username',
		sortable: true,
		cell: (row) => row.username,
	},

	{
		name: 'Actions',
		minWidth: '80px',
		cell: (row) => (
			<UncontrolledDropdown>
				<DropdownToggle tag="div" className="btn btn-sm">
					<MoreVertical size={14} className="cursor-pointer" />
				</DropdownToggle>
				<DropdownMenu right>
					<DropdownItem
						tag={Link}
						to={`/apps/user/view/${row.id}`}
						className="w-100"
						// onClick={() => store.dispatch(getUser(row.id))}
					>
						<Eye size={14} className="mr-50" />
						<span className="align-middle">Details</span>
					</DropdownItem>
					<DropdownItem
						tag={Link}
						to={`/apps/user/edit/${row.id}`}
						className="w-100"
						// onClick={() => store.dispatch(getUser(row.id))}
					>
						<Edit size={14} className="mr-50" />
						<span className="align-middle">Edit</span>
					</DropdownItem>
					<DropdownItem
						className="w-100"
						// onClick={() => store.dispatch(deleteUser(row.id))}
					>
						<Trash2 size={14} className="mr-50" />
						<span className="align-middle">Delete</span>
					</DropdownItem>
				</DropdownMenu>
			</UncontrolledDropdown>
		),
	},
];
