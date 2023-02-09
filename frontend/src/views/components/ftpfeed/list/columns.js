// ** Third Party Components
import { Badge } from 'reactstrap';

const statusObj = {
	active: 'light-success',
	inactive: 'light-danger',
};

export const columns = [
	{
		name: 'Sku',
		minWidth: '120px',
		selector: 'sku',
		sortable: true,
		center: true,
		cell: (row) => row.sku,
	},
	{
		name: 'Shape',
		minWidth: '50px',
		selector: 'shape',
		sortable: true,
		center: true,
		cell: (row) => row.shape,
	},
	{
		name: 'Carat',
		minWidth: '50px',
		selector: 'carat',
		sortable: true,
		right: true,
		cell: (row) => row.carat,
	},
	{
		name: 'Color',
		minWidth: '130px',
		selector: 'color',
		sortable: true,
		center: true,
		cell: (row) => (row.color == '' ? '-' : row.color),
	},
	{
		name: 'Clarity',
		minWidth: '80px',
		selector: 'clarity',
		sortable: true,
		center: true,
		cell: (row) => row.clarity,
	},
	{
		name: 'Measurement',
		minWidth: '170px',
		selector: 'measurement',
		// sortable: true,
		center: true,
		cell: (row) => row.measurement,
	},
	{
		name: 'Price($)',
		minWidth: '110px',
		selector: 'price',
		sortable: true,
		// center: true,
		right: true,
		cell: (row) => row.price.toLocaleString('en-US'),
	},
	{
		name: 'Certificate No',
		minWidth: '175px',
		selector: 'certificate_no',
		sortable: true,
		center: true,
		cell: (row) => row.certificate_no,
	},

	{
		name: 'Lab',
		minWidth: '80px',
		selector: 'lab',
		// sortable: true,
		center: true,
		cell: (row) => row.lab,
	},

	{
		name: 'TBL',
		minWidth: '80px',
		selector: 'tbl',
		// sortable: true,
		center: true,
		cell: (row) => row.tbl,
	},

	{
		name: 'Cut',
		minWidth: '40px',
		selector: 'cut',
		// sortable: true,
		center: true,
		cell: (row) => (row.cut == '' ? '-' : row.cut),
	},

	{
		name: 'Dept',
		minWidth: '110px',
		selector: 'dept',
		sortable: true,
		cell: (row) => (row.dept == '' ? '-' : row.dept),
	},

	{
		name: 'Fl',
		minWidth: '60px',
		selector: 'fl',
		// sortable: true,
		center: true,
		cell: (row) => (row.fl == '' ? '-' : row.fl),
	},

	{
		name: 'Girdle',
		minWidth: '150px',
		selector: 'girdle',
		// sortable: true,
		center: true,
		cell: (row) => (row.girdle == '' ? '-' : row.girdle),
	},
	{
		name: 'Cul',
		minWidth: '70px',
		selector: 'cul',
		// sortable: true,
		center: true,
		cell: (row) => (row.cul == '' ? '-' : row.cul),
	},

	{
		name: 'Pol',
		minWidth: '70px',
		selector: 'pol',
		// sortable: true,
		center: true,
		cell: (row) => (row.pol == '' ? '-' : row.pol),
	},

	{
		name: 'Rap',
		minWidth: '70px',
		selector: 'rap',
		// sortable: true,
		center: true,
		cell: (row) => (row.rap == '' ? '-' : row.rap),
	},

	{
		name: 'Sym',
		minWidth: '70px',
		selector: 'sym',
		// sortable: true,
		right: true,
		cell: (row) => (row.sym == '' ? '-' : row.sym),
	},

	// {
	// 	name: 'Status',
	// 	minWidth: '100px',
	// 	selector: 'is_active',
	// 	sortable: true,
	// 	center: true,
	// 	cell: (row) => (
	// 		<Badge
	// 			className="text-capitalize"
	// 			color={statusObj[row.is_active === true ? 'active' : 'inactive']}
	// 			pill
	// 		>
	// 			{row.is_active === true ? 'active' : 'inactive'}
	// 		</Badge>
	// 	),
	// },
];
