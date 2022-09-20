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
	inactive: 'light-danger',
};

export const columns = [
	{
		name: 'Sku',
		minWidth: '190px',
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
		minWidth: '170px',
		selector: 'color',
		sortable: true,
		cell: (row) => row.color,
	},
	{
		name: 'Measurement',
		minWidth: '210px',
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
		name: 'Lab',
		minWidth: '100px',
		selector: 'lab',
		sortable: true,
		cell: (row) => row.lab,
	},

	{
		name: 'Cut',
		minWidth: '100x',
		selector: 'cut',
		sortable: true,
		cell: (row) => (row.cut == '' ? '-' : row.cut),
	},

	{
		name: 'Dept',
		minWidth: '100px',
		selector: 'dept',
		sortable: true,
		cell: (row) => (row.dept == '' ? '-' : row.dept),
	},

	{
		name: 'Fl',
		minWidth: '100px',
		selector: 'fl',
		sortable: true,
		cell: (row) => (row.fl == '' ? '-' : row.fl),
	},

	{
		name: 'Girdle',
		minWidth: '190px',
		selector: 'girdle',
		sortable: true,
		cell: (row) => (row.girdle == '' ? '-' : row.girdle),
	},

	{
		name: 'Cul',
		minWidth: '100px',
		selector: 'cul',
		sortable: true,
		cell: (row) => (row.cul == '' ? '-' : row.cul),
	},

	{
		name: 'Pol',
		minWidth: '100px',
		selector: 'pol',
		sortable: true,
		cell: (row) => (row.pol == '' ? '-' : row.pol),
	},

	{
		name: 'Rap',
		minWidth: '100px',
		selector: 'rap',
		sortable: true,
		cell: (row) => (row.rap == '' ? '-' : row.rap),
	},
	
	{
		name: 'Sym',
		minWidth: '100px',
		selector: 'sym',
		sortable: true,
		cell: (row) => (row.sym == '' ? '-' : row.sym),
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
