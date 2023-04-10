import ReactTooltip from 'react-tooltip';

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
		// cell: (row) => row.shape,
		cell: (row) => {
			return (
				<>
					<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
						{row.shape}
					</div>
				</>
			);
		},
	},
	{
		name: 'Carat',
		minWidth: '50px',
		selector: 'carat',
		sortable: true,
		right: true,
		// cell: (row) => row.carat,
		cell: (row) => {
			return (
				<>
					<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
						{row.carat}
					</div>
				</>
			);
		},
	},
	{
		name: 'Color',
		minWidth: '130px',
		selector: 'color',
		sortable: true,
		center: true,
		// cell: (row) => (row.color == '' ? '-' : row.color),
		cell: (row) => {
			return (
				<>
					<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
						{row.color == '' ? '-' : row.color}
					</div>
				</>
			);
		},
	},
	{
		name: 'Clarity',
		minWidth: '120px',
		selector: 'clarity',
		sortable: true,
		center: true,
		// cell: (row) => row.clarity,
		cell: (row) => {
			return (
				<>
					<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
						{row.clarity == '' ? '-' : row.clarity}
					</div>
				</>
			);
		},
	},
	{
		name: 'Measurement',
		minWidth: '170px',
		selector: 'measurement',
		// sortable: true,
		center: true,
		// cell: (row) => row.measurement,
		cell: (row) => {
			return (
				<>
					<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
						{row.measurement == '' ? '-' : row.measurement}
					</div>
				</>
			);
		},
	},
	{
		name: 'Price($)',
		minWidth: '110px',
		selector: 'price',
		sortable: true,
		// center: true,
		right: true,
		// cell: (row) => row.price?.toLocaleString('en-US'),
		cell: (row) => {
			return (
				<>
					<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
						{row.price?.toLocaleString('en-US')}
					</div>
				</>
			);
		},
	},
	{
		name: 'Certificate No',
		minWidth: '175px',
		selector: 'certificate_no',
		sortable: true,
		center: true,
		// cell: (row) => (row.certificate_no == '' ? '-' : row.certificate_no),
		cell: (row) => {
			return (
				<>
					<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
						{row.certificate_no == '' ? '-' : row.certificate_no}
					</div>
				</>
			);
		},
	},

	{
		name: 'Lab',
		minWidth: '80px',
		selector: 'lab',
		// sortable: true,
		center: true,
		// cell: (row) => (row.lab == '' ? '-' : row.lab),
		cell: (row) => {
			return (
				<>
					<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
						{row.lab == '' ? '-' : row.lab}
					</div>
				</>
			);
		},
	},

	{
		name: 'TBL',
		minWidth: '80px',
		selector: 'tbl',
		// sortable: true,
		center: true,
		// cell: (row) => row.tbl,
		cell: (row) => {
			return (
				<>
					<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
						{row.tbl == '' ? '-' : row.tbl}
					</div>
				</>
			);
		},
	},

	{
		name: 'Cut',
		minWidth: '160px',
		selector: 'cut',
		// sortable: true,
		center: true,
		// cell: (row) => (row.cut == '' ? '-' : row.cut),
		cell: (row) => {
			return (
				<>
					<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
						{row.cut == '' ? '-' : row.cut}
					</div>
				</>
			);
		},
	},

	{
		name: 'Dept',
		minWidth: '110px',
		selector: 'dept',
		sortable: true,
		// cell: (row) => (row.dept == '' ? '-' : row.dept),
		cell: (row) => {
			return (
				<>
					<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
						{row.dept == '' ? '-' : row.dept}
					</div>
				</>
			);
		},
	},

	{
		name: 'Fl',
		minWidth: '60px',
		selector: 'fl',
		// sortable: true,
		center: true,
		// cell: (row) => (row.fl == '' ? '-' : row.fl),
		cell: (row) => {
			return (
				<>
					<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
						{row.fl == '' ? '-' : row.fl}
					</div>
				</>
			);
		},
	},

	{
		name: 'Girdle',
		minWidth: '150px',
		selector: 'girdle',
		// sortable: true,
		center: true,
		// cell: (row) => (row.girdle == '' ? '-' : row.girdle),
		cell: (row) => {
			return (
				<>
					<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
						{row.girdle == '' ? '-' : row.girdle}
					</div>
				</>
			);
		},
	},
	{
		name: 'Cul',
		minWidth: '70px',
		selector: 'cul',
		// sortable: true,
		center: true,
		// cell: (row) => (row.cul == '' ? '-' : row.cul),
		cell: (row) => {
			return (
				<>
					<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
						{row.cul == '' ? '-' : row.cul}
					</div>
				</>
			);
		},
	},

	{
		name: 'Pol',
		minWidth: '70px',
		selector: 'pol',
		// sortable: true,
		center: true,
		// cell: (row) => (row.pol == '' ? '-' : row.pol),
		cell: (row) => {
			return (
				<>
					<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
						{row.pol == '' ? '-' : row.pol}
					</div>
				</>
			);
		},
	},

	{
		name: 'Rap',
		minWidth: '70px',
		selector: 'rap',
		// sortable: true,
		center: true,
		// cell: (row) => (row.rap == '' ? '-' : row.rap),
		cell: (row) => {
			return (
				<>
					<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
						{row.rap == '' ? '-' : row.rap}
					</div>
				</>
			);
		},
	},

	{
		name: 'Sym',
		minWidth: '70px',
		selector: 'sym',
		// sortable: true,
		right: true,
		// cell: (row) => (row.sym == '' ? '-' : row.sym),
		cell: (row) => {
			return (
				<>
					<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
						{row.sym == '' ? '-' : row.sym}
					</div>
				</>
			);
		},
	},
	{
		cell: (row) => {
			return (
				<ReactTooltip id={`${row.sku}`} className="tooltip_info" place="top" effect="solid">
					{row.sku}
				</ReactTooltip>
			);
		},
	},
];
