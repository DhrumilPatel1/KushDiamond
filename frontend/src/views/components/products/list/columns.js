// ** React Imports
import { Link } from 'react-router-dom';

// // ** Store & Actions
// import { getUser, deleteUser } from '../store/action';
// import { store } from '@store/storeConfig/store'

// ** Third Party Components
import {
	Badge,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';
import {
	Slack,
	User,
	Settings,
	Database,
	Edit2,
	MoreVertical,
	FileText,
	Trash2,
	Archive,
	Eye,
	Edit,
} from 'react-feather';

const statusObj = {
	active: 'light-success',
	inactive: 'light-secondary',
};

export const columns = [
	{
		name: 'Sku',
		minWidth: '150px',
		selector: 'sku',
		sortable: true,
		cell: (row) => row.sku,
	},
	{
		name: 'Shape',
		minWidth: '130px',
		selector: 'shape',
		sortable: true,
		cell: (row) => row.shape,
	},
	{
		name: 'Carat',
		minWidth: '90px',
		selector: 'carat',
		sortable: true,
		cell: (row) => row.carat,
	},
	{
		name: 'Color',
		minWidth: '150px',
		selector: 'color',
		sortable: true,
		cell: (row) => row.color,
	},
	{
		name: 'Measurement',
		minWidth: '200px',
		selector: 'measurement',
		sortable: true,
		cell: (row) => row.measurement,
	},
	{
		name: 'Price',
		minWidth: '120px',
		selector: 'price',
		sortable: true,
		cell: (row) => row.price,
	},

	{
		name: 'Certificate No',
		minWidth: '190px',
		selector: 'certificate_no',
		sortable: true,
		cell: (row) => row.certificate_no,
	},

	{
		name: 'Status',
		minWidth: '138px',
		selector: 'is_active',
		sortable: true,
		cell: (row) => (
			<Badge
				className="text-capitalize"
				color={statusObj[row.is_active === true ? 'active' : 'inactive']}
				pill
			>
				{row.is_active === true ? 'active' : 'inactive'}
			</Badge>
		),
	},
	{
		name: 'Actions',
		minWidth: '100px',
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
