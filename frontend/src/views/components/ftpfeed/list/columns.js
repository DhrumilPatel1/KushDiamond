// ** Third Party Components
import { Badge } from 'reactstrap';

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
];
