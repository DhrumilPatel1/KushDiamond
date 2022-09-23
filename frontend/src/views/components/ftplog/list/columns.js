// ** Third Party Components
import { Badge } from 'reactstrap';
import moment from 'moment';
const statusObj = {
	success: 'light-success',
	failed: 'light-danger',
};

export const columns = [
	{
		name: 'Client',
		width: '450px',
		selector: 'client',
		sortable: true,

		cell: (row) => row.client,
	},
	{
		name: 'Date',
		width: '210px',
		selector: 'created_at',
		sortable: true,
		cell: (row) => moment(row.created_at).format('MMM DD YYYY h:mm A'),
	},
	{
		name: 'File',
		width: '260px',
		selector: 'file',
		sortable: true,
		cell: (row) => row.file,
	},
	{
		name: 'Status',
		width: '130px',
		selector: 'status',
		sortable: true,
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
		width: '1500px',
		selector: 'error_status',
		sortable: true,
		cell: (row) => (row.error_status ? row.error_status : '-'),
	},
];
