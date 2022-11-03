// ** Third Party Components
import { Badge } from 'reactstrap';
import moment from 'moment';
const statusObj = {
	success: 'light-success',
	failed: 'light-danger',
};

// const ExpandableTable = ({ data }) => {
// 	return (
// 		<div className="expandable-content p-2">
// 			<p>
// 				<span className="font-weight-bold">SkuList:</span> {data.skulist}
// 			</p>
// 		</div>
// 	);
// };

export const columns = [
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
		name: 'Log Status',
		width: '700px',
		selector: 'error_status',
		cell: (row) => (row.error_status ? row.error_status : '-'),
	},
];

// export default ExpandableTable;
