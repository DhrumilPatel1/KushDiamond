// ** React Imports
import { Fragment, useState, useEffect } from 'react';
// ** Columns
// import ExpandableTable, { data, columns } from './columns';
import { columns } from './columns';
import { useDispatch, useSelector } from 'react-redux';
// ** Third Party Components

import { ChevronDown } from 'react-feather';
import DataTable from 'react-data-table-component';
import { Card, Row, Col, CardBody } from 'reactstrap';
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { datatable_per_page, datatable_per_raw } from '../../../../configs/constant_array';
import { mediaLogListRequest } from '../../../../redux/mediaLogSlice';

const mediaLogList = () => {
	const dispatch = useDispatch();

	const { mediaLogList, isLoading } = useSelector((state) => state.mediaLog);

	const [limit, setPerPage] = useState(datatable_per_page);
	const [sort_order, setSort_order] = useState('desc');

	const table_data = {
		page: 1,
		per_page: limit,
		sort_order: sort_order,
		order_column: 'created_at',
	};

	const [queryString, setQueryString] = useState(
		`page=${table_data.page}&per_page=${table_data.per_page}&order_column=${table_data.order_column}`
	);

	useEffect(() => {
		dispatch(mediaLogListRequest(queryString));
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

	const dynamicHeight = Math.min(window.innerHeight * 4 + 1, 70) + 'vh';

	return (
		<Fragment>
			<Card>
				<CardBody className="deskboard_card_body">
					<Row>
						<Col xl="8">
							<h3>Media Log List</h3>
						</Col>
					</Row>
				</CardBody>
				<DataTable
					noHeader
					pagination
					responsive
					paginationServer
					columns={columns}
					expandOnRowClicked
					data={mediaLogList?.results}
					paginationTotalRows={mediaLogList?.count}
					paginationRowsPerPageOptions={datatable_per_raw}
					onChangeRowsPerPage={handlePerRowsChange}
					onChangePage={handlePageChange}
					sortIcon={<ChevronDown />}
					className="react-dataTable datatalbe_bg_color"
					paginationPerPage={table_data.per_page}
					fixedHeader
					fixedHeaderScrollHeight={dynamicHeight}
				/>
			</Card>
		</Fragment>
	);
};

export default mediaLogList;
