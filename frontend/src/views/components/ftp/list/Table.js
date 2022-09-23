// ** React Imports
import { Fragment, useState, useEffect } from 'react';
// ** Columns
import { columns } from './columns';
import { useDispatch, useSelector } from 'react-redux';
// ** Third Party Components

import { ChevronDown, Plus } from 'react-feather';
import DataTable from 'react-data-table-component';
import { Card, Input, Row, Col, Button, CardBody } from 'reactstrap';
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { datatable_per_page, datatable_per_raw } from '../../../../configs/constant_array';
import { Link } from 'react-router-dom';
import { FtpClientList } from '../../../../redux/FtpsSlice';

const FtpList = () => {
	const dispatch = useDispatch();
	const { ftpData, isLoading } = useSelector((state) => state.Ftps);

	const [limit, setPerPage] = useState(datatable_per_page);
	const [sort_order, setSort_order] = useState('desc');

	const [filter_value, setFilter_value] = useState('');

	const table_data = {
		page: 1,
		per_page: limit,
		sort_order: sort_order,
		filter_value: filter_value,
		order_column: 'updated_at',
	};
	const [queryString, setQueryString] = useState(
		`page=${table_data.page}&search=${table_data.filter_value}&per_page=${table_data.per_page}&order_column=${table_data.order_column}`
	);

	useEffect(() => {
		dispatch(FtpClientList(queryString));
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
		tableChangeHandler({ ...table_data, search: value });
		setFilter_value(value);
	};

	useEffect(() => {
		dispatch(FtpClientList());
	}, []);
	const dynamicHeight = Math.min(window.innerHeight * 4 + 1, 70) + 'vh';
	return (
		<Fragment>
			<Card>
				<CardBody className="deskboard_card_body">
					<Row>
						<Col xl="6">
							<h3 className="header_text_size">FTP List</h3>
						</Col>
						<Col
							xl="6"
							className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
						>
							<div className="d-flex align-items-center mb-sm-0 mb-1 mr-1 search-chairman-btn">
								<Input
									id="search-invoice"
									className="ml-50 w-100 form-control-sm "
									type="text"
									size="sm"
									name="search"
									onChange={handleFilter}
									value={filter_value}
									placeholder="Search"
								/>
							</div>
							<Button className="ml-2" size="sm" color="primary" tag={Link} to={'/ftp/add'}>
								<Plus size={15} />
								<span className="align-middle ml-50" size="sm">
									Create
								</span>
							</Button>
						</Col>
					</Row>
				</CardBody>
				<DataTable
					noHeader
					pagination
					// subHeader
					responsive
					paginationServer
					columns={columns}
					data={ftpData?.results}
					paginationTotalRows={ftpData?.count}
					paginationRowsPerPageOptions={datatable_per_raw}
					onChangeRowsPerPage={handlePerRowsChange}
					onChangePage={handlePageChange}
					sortIcon={<ChevronDown />}
					className="react-dataTable"
					fixedHeader
					fixedHeaderScrollHeight={dynamicHeight}
					paginationPerPage={table_data.per_page}
					progressPending={isLoading}
					// subHeaderComponent={<CustomHeader value={filter_value} handleFilter={handleFilter} />}
				/>
			</Card>
		</Fragment>
	);
};

export default FtpList;
