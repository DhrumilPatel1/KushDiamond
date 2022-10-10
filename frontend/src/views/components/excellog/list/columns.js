// ** Third Party Components
import { Badge } from 'reactstrap';
import moment from 'moment';
const statusObj = {
	success: 'light-success',
	failed: 'light-danger',
};

export const columns = [
	{
		name: 'File',
		width: '200px',
		selector: 'file',
		// sortable: true,
		cell: (row) => (
			<a href={row.file_url} download={row.file_url}>
				{row.file}
			</a>
		),
	},
	{
		name: 'Type',
		width: '200px',
		selector: 'type',
		// sortable: true,
		cell: (row) => (row.type == null ? '-' : row.type),
	},
	{
		name: 'Date',
		width: '210px',
		selector: 'created_at',
		sortable: true,
		cell: (row) => moment(row.created_at).format('MMM DD YYYY h:mm A'),
	},
	{
		name: 'Status',
		width: '130px',
		selector: 'status',
		// sortable: true,
		cell: (row) => (
			<Badge
				className="text-capitalize"
				color={statusObj[row.status === 'error' ? 'failed' : 'success']}
				pill
			>
				{row.status === 'error' ? 'failed' : 'success'}
			</Badge>
		),
	},
	{
		name: 'Error Status',
		width: '400px',
		selector: 'error_status',
		// sortable: true,
		cell: (row) => (row.error_status ? row.error_status : '-'),
	},
];
