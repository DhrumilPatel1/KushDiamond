// ** React Imports
import { Link } from 'react-router-dom';

// ** Third Party Components
import { Badge } from 'reactstrap';
import { Trash2, Eye, Edit } from 'react-feather';

const statusObj = {
	active: 'success',
	inactive: 'danger',
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
	// 	minWidth: '150px',
	// 	cell: (row) => {
	// 		return (
	// 			<div className="d-inline ">
	// 				<Link to={`/admin/instructions/view/${row.id}`} className="text-primary">
	// 					<Eye size={18} />
	// 				</Link>

	// 				<Link to={`/admin/instructions/edit/${row.id}`} className="text-warning mx-1">
	// 					<Edit size={18} />
	// 				</Link>

	// 				<Trash2 className="text-danger" size={18} style={{ cursor: 'pointer' }} />
	// 			</div>
	// 		);
	// 	},
	// },
];
