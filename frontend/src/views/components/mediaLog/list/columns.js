// ** Third Party Components
import { Badge } from 'reactstrap';
import moment from 'moment';
const statusObj = {
	Pending: 'light-warning',
	Success: 'light-success',
	fail: 'light-danger',
};

export const columns = [
	{
		name: 'Sku',
		width: '120px',
		selector: 'sku',
		sortable: true,
		center: true,
		cell: (row) => row.sku,
	},

	{
		name: 'username',
		width: '140px',
		selector: 'user_name',
		// sortable: true,
		cell: (row) => row.user_name,
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
			<Badge className="text-capitalize" color={statusObj[row.status]} pill>
				{row.status}
			</Badge>
		),
	},
	{
		name: 'Error Status',
		width: '700px',
		selector: 'error_status',
		cell: (row) => (row.error_status ? row.error_status : '-'),
	},
];
