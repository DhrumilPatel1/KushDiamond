// ** Third Party Components
import { Badge } from 'reactstrap';
import moment from 'moment';

const statusObj = {
	success: 'light-success',
	error: 'light-danger',
};

export const columns = [
	{
		name: 'Host',
		minWidth: '130px',
		selector: 'client',
		sortable: true,
		cell: (row) => row.client,
	},
	{
		name: 'Date',
		minWidth: '130px',
		selector: 'created_at',
		sortable: true,
		cell: (row) => moment(row.created_at).format('DD/MM/YYYY'),
	},
	{
		name: 'File',
		minWidth: '130px',
		selector: 'file',
		sortable: true,
		cell: (row) => row.file,
	},
	{
		name: 'Status',
		minWidth: '90px',
		selector: 'status',
		sortable: true,
		cell: (row) => (
			<Badge className="text-capitalize" color={statusObj[row.status]} pill>
				{row.status}
			</Badge>
		),
	},
	{
		name: 'Error Status',
		minWidth: '100px',
		selector: 'error_status',
		sortable: true,
		cell: (row) => (row.error_status ? row.error_status : '-'),
	},
];
