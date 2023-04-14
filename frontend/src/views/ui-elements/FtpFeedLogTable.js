import { Table } from 'reactstrap';
import { Badge } from 'reactstrap';
import moment from 'moment';
const statusObj = {
	success: 'light-success',
	failed: 'light-danger',
};

const FtpFeedLogTable = ({ ftpLogList }) => {
	return (
		<Table responsive>
			<thead>
				<tr>
					<th scope="col" className="text-nowrap">
						CLIENT
					</th>
					<th scope="col" className="text-nowrap">
						HOST NAME
					</th>
					<th scope="col" className="text-nowrap">
						USERNAME
					</th>
					<th scope="col" className="text-nowrap">
						DATE
					</th>
					<th scope="col" className="text-nowrap">
						FILE
					</th>
					<th scope="col" className="text-nowrap">
						STATUS
					</th>
					<th scope="col" className="text-nowrap">
						ERROR STATUS
					</th>
				</tr>
			</thead>
			<tbody>
				{ftpLogList?.map((ele) => {
					return (
						<tr>
							<td className="text-nowrap">{ele.client_id__client_name}</td>
							<td className="text-nowrap">{ele.client}</td>
							<td className="text-nowrap">{ele.created_by_id__username}</td>
							<td className="text-nowrap">{moment(ele.created_at).format('MMM DD YYYY h:mm A')}</td>
							<td className="text-nowrap">
								<a href={`${process.env.REACT_APP_BASE_URL_API}/${ele.file}`} download={ele.file}>
									{ele.file}
								</a>
							</td>
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

export default FtpFeedLogTable;
