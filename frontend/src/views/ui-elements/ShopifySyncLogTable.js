import { Table } from 'reactstrap';
import { Badge } from 'reactstrap';
import moment from 'moment';
const statusObj = {
	success: 'light-success',
	failed: 'light-danger',
};

const ShopifySyncLogTable = ({ shopifySyncLogList }) => {
	return (
		<Table responsive>
			<thead>
				<tr>
					<th scope="col" className="text-nowrap">
						USERNAME
					</th>
					<th scope="col" className="text-nowrap">
						DATE
					</th>

					<th scope="col" className="text-nowrap">
						STATUS
					</th>
					<th scope="col" className="text-nowrap">
						LOG STATUS
					</th>
				</tr>
			</thead>
			<tbody>
				{shopifySyncLogList?.map((ele) => {
					return (
						<tr>
							<td className="text-nowrap">{ele.created_by_id__username}</td>
							<td className="text-nowrap">{moment(ele.Datetime).format('MMM DD YYYY h:mm A')}</td>
							<td className="text-nowrap">
								<Badge
									className="text-capitalize"
									color={statusObj[ele.status === 'error' ? 'failed' : 'success']}
									pill
								>
									{ele.status === 'error' ? 'failed' : 'success'}
								</Badge>
							</td>
							<td className="text-nowrap">{ele.error_status ? ele.error_status : '-'}</td>
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
};

export default ShopifySyncLogTable;
