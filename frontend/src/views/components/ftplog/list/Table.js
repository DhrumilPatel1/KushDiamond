// ** React Imports
import { Fragment, useState, useEffect } from 'react';
// ** Columns
import { columns } from './columns';
import { useDispatch, useSelector } from 'react-redux';
// ** Third Party Components

import { ChevronDown } from 'react-feather';
import DataTable from 'react-data-table-component';
import { Card, Row, Col } from 'reactstrap';
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { datatable_per_page, datatable_per_raw } from '../../../../configs/constant_array';
import { FtpClientList } from '../../../../redux/FtpsSlice';
import { FtpLogListRequest } from '../../../../redux/FtpLogSlice';

// ** Table Header
const CustomHeader = () => {
	return (
		<div className="invoice-list-table-header w-100 mr-1 ml-50">
			<Row>
				<Col
					xl="6"
					className="d-flex justify-content-lg-start align-items-center justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
				>
					<h3>FTP Log List</h3>
				</Col>
			</Row>
		</div>
	);
};

const FtpLogList = () => {
	const dispatch = useDispatch();
	const { ftpLogList, isLoading } = useSelector((state) => state.FtpLog);

	// const { ftpData, isLoading } = useSelector((state) => state.Ftps);

	const [limit, setPerPage] = useState(datatable_per_page);
	const [sort_order, setSort_order] = useState('desc');

	const table_data = {
		page: 1,
		per_page: limit,
		sort_order: sort_order,
		order_column: 'updated_at',
	};

	const [queryString, setQueryString] = useState(
		`page=${table_data.page}&per_page=${table_data.per_page}&order_column=${table_data.order_column}`
	);

	useEffect(() => {
		dispatch(FtpLogListRequest(queryString));
	}, [dispatch, queryString]);

	const handlePerRowsChange = (newPerPage, page) => {
		setPerPage(newPerPage);
		tableChangeHandler({ ...table_data, page: page, per_page: newPerPage });
	};

	const handlePageChange = (page) => {
		tableChangeHandler({ ...table_data, page: page });
	};

	const tableChangeHandler = (data) => {
		let queryStr = Object.keys(data)
			.map((key) => {
				return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
			})
			.join('&');
		setQueryString(queryStr);
	};

	return (
		<Fragment>
			<Card>
				<DataTable
					noHeader
					pagination
					subHeader
					responsive
					paginationServer
					columns={columns}
					data={ftpLogList?.results}
					paginationTotalRows={ftpLogList?.count}
					paginationRowsPerPageOptions={datatable_per_raw}
					onChangeRowsPerPage={handlePerRowsChange}
					onChangePage={handlePageChange}
					sortIcon={<ChevronDown />}
					className="react-dataTable"
					paginationPerPage={table_data.per_page}
					progressPending={isLoading}
					subHeaderComponent={<CustomHeader />}
				/>
			</Card>
		</Fragment>
	);
};

export default FtpLogList;
