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
import ProductsActionIcon from '../ProductsActionIcon';

const statusObj = {
	active: 'light-success',
	inactive: 'light-danger',
};

export const columns = [
	{
		name: 'Sku',
		minWidth: '170px',
		selector: 'sku',
		sortable: true,
		cell: (row) => row.sku,
	},
	{
		name: 'Shape',
		minWidth: '115px',
		selector: 'shape',
		sortable: true,
		cell: (row) => row.shape,
	},
	{
		name: 'Carat',
		minWidth: '80px',
		selector: 'carat',
		sortable: true,
		cell: (row) => row.carat,
	},
	{
		name: 'Color',
		minWidth: '140px',
		selector: 'color',
		sortable: true,
		cell: (row) => row.color,
	},
	{
		name: 'Measurement',
		minWidth: '160px',
		selector: 'measurement',
		sortable: true,
		cell: (row) => row.measurement,
	},
	{
		name: 'Price',
		minWidth: '100px',
		selector: 'price',
		sortable: true,
		cell: (row) => row.price,
	},

	{
		name: 'Certificate No',
		minWidth: '175px',
		selector: 'certificate_no',
		sortable: true,
		cell: (row) => row.certificate_no,
	},

	{
		name: 'Lab',
		minWidth: '80px',
		selector: 'lab',
		sortable: true,
		cell: (row) => row.lab,
	},

	{
		name: 'Cut',
		minWidth: '40px',
		selector: 'cut',
		sortable: true,
		cell: (row) => (row.cut == '' ? '-' : row.cut),
	},

	{
		name: 'Dept',
		minWidth: '60px',
		selector: 'dept',
		sortable: true,
		cell: (row) => (row.dept == '' ? '-' : row.dept),
	},

	{
		name: 'Fl',
		minWidth: '60px',
		selector: 'fl',
		sortable: true,
		cell: (row) => (row.fl == '' ? '-' : row.fl),
	},

	{
		name: 'Girdle',
		minWidth: '150px',
		selector: 'girdle',
		sortable: true,
		cell: (row) => (row.girdle == '' ? '-' : row.girdle),
	},

	{
		name: 'Cul',
		minWidth: '70px',
		selector: 'cul',
		sortable: true,
		cell: (row) => (row.cul == '' ? '-' : row.cul),
	},

	{
		name: 'Pol',
		minWidth: '70px',
		selector: 'pol',
		sortable: true,
		cell: (row) => (row.pol == '' ? '-' : row.pol),
	},

	{
		name: 'Rap',
		minWidth: '70px',
		selector: 'rap',
		sortable: true,
		cell: (row) => (row.rap == '' ? '-' : row.rap),
	},

	{
		name: 'Sym',
		minWidth: '70px',
		selector: 'sym',
		sortable: true,
		cell: (row) => (row.sym == '' ? '-' : row.sym),
	},

	{
		name: 'Status',
		minWidth: '100px',
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
		minWidth: '110px',
		cell: (row) => {
			return (
				<div className="d-inline ">
					<ProductsActionIcon id={row.id} />
				</div>
			);
		},
	},
];
