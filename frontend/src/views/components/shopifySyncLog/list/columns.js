// ** Third Party Components
import { Badge } from 'reactstrap';
import moment from 'moment';
const statusObj = {
	success: 'light-success',
	failed: 'light-danger',
};

export const columns = [
	{
		name: 'SkuList',
		width: '430px',
		selector: 'skulist',
		sortable: true,
		cell: (row) => row.skulist,
	},
	{
		name: 'Date',
		width: '210px',
		selector: 'Datetime',
		sortable: true,
		cell: (row) => moment(row.Datetime).format('MMM DD YYYY h:mm A'),
	},

	{
		name: 'Status',
		width: '130px',
		selector: 'status',
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
		width: '300px',
		selector: 'error_status',
		cell: (row) => (row.error_status ? row.error_status : '-'),
	},
];
