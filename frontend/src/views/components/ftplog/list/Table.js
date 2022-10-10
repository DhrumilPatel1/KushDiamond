// ** React Imports
import { Fragment, useState, useEffect } from 'react';
// ** Columns
import { columns } from './columns';
import { useDispatch, useSelector } from 'react-redux';
// ** Third Party Components

import { ChevronDown } from 'react-feather';
import DataTable from 'react-data-table-component';
import { Card, Row, Col, CardBody, Input } from 'reactstrap';
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { datatable_per_page, datatable_per_raw } from '../../../../configs/constant_array';
import { FtpLogListRequest } from '../../../../redux/FtpLogSlice';

const FtpLogList = () => {
	const dispatch = useDispatch();
	const { ftpLogList, isLoading } = useSelector((state) => state.FtpLog);

	// const { ftpData, isLoading } = useSelector((state) => state.Ftps);

	const [limit, setPerPage] = useState(datatable_per_page);
	const [sort_order, setSort_order] = useState('desc');

	const [filter_value, setFilter_value] = useState('');

	const table_data = {
		page: 1,
		per_page: limit,
		client_name: filter_value,
		sort_order: sort_order,
		order_column: 'created_at',
	};

	const [queryString, setQueryString] = useState(
		`page=${table_data.page}&per_page=${table_data.per_page}&order_column=${table_data.order_column}&client_name=${table_data.client_name}`
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

	const handleFilter = (e) => {
		let value = e.target.value;
		tableChangeHandler({ ...table_data, client_name: value });
		setFilter_value(value);
	};

	const dynamicHeight = Math.min(window.innerHeight * 4 + 1, 70) + 'vh';

	return (
		<Fragment>
			<Card>
				<CardBody className="deskboard_card_body">
					<Row>
						<Col xl="8">
							<h3>FTP Feed Log List</h3>
						</Col>
						<Col xl="4" className="d-flex justify-content-lg-end">
							{/* <Input
								id="search-invoice"
								className="w-50"
								type="text"
								size="sm"
								name="search"
								onChange={handleFilter}
								placeholder="Search"
							/> */}
						</Col>
					</Row>
				</CardBody>
				<DataTable
					noHeader
					pagination
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
					// progressPending={isLoading}
					fixedHeader
					fixedHeaderScrollHeight={dynamicHeight}
				/>
			</Card>
		</Fragment>
	);
};

export default FtpLogList;
