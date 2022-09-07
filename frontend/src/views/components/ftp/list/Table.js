// ** React Imports
import { Fragment, useState, useEffect } from 'react';
// ** Columns
import { columns } from './columns';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
// ** Third Party Components
import ReactPaginate from 'react-paginate';
import { ChevronDown, Plus, Share } from 'react-feather';
import DataTable from 'react-data-table-component';
import {
	Card,
	CardHeader,
	CardTitle,
	Input,
	Row,
	Col,
	Label,
	CustomInput,
	Button,
	CardBody,
	FormGroup,
	Form,
} from 'reactstrap';
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { productExcelUpload, productList } from '../../../../redux/productsSlice';
import { datatable_per_page, datatable_per_raw } from '../../../../configs/constant_array';
import { Link } from 'react-router-dom';
import { FtpClientList } from '../../../../redux/FtpsSlice';
// ** Table Header
const CustomHeader = ({ handlePerPage, limit, handleFilter, searchTerm }) => {
	return (
		<div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75">
			<Row>
				<Col
					xl="12"
					className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
				>
					<div className="d-flex align-items-center mb-sm-0 mb-1 mr-1 search-chairman-btn">
						<Input
							id="search-invoice"
							className="ml-50 w-100"
							type="text"
							name="search"
							onChange={handleFilter}
							placeholder="Search"
						/>
					</div>
					<Button className="ml-2" color="primary" tag={Link} to={'/ftp/add'}>
						<Plus size={15} />
						<span className="align-middle ml-50">Add Ftp</span>
					</Button>
				</Col>
			</Row>
		</div>
	);
};

const FtpList = () => {


	// ** Store Vars
	const dispatch = useDispatch();
	const { ftpData, isLoading } = useSelector((state) => state.Ftps);
	console.log(isLoading, 'isLoading');
	// ** States

	// ** Get data on mount

	// const handlePagination = (page) => {
	// 	tableChangeHandler({ ...table_data, page: page.selected + 1 });
	// };

	// ** Function in get data on rows per page

	const [limit, setPerPage] = useState(datatable_per_page);

	const [sort_order, setSort_order] = useState('desc');
	const [filterColor, setFilterColor] = useState('');
	const [filterShape, setFilterShape] = useState('');

	const [filterCut, setFilterCut] = useState('');
	const [filter_value, setFilter_value] = useState('');

	const table_data = {
		page: 1,
		per_page: limit,
		sort_order: sort_order,
		color: filterColor,
		shape: filterShape,
		filter_value: filter_value,
		cut: filterCut,
		order_column: 'updated_at',
	};

	const [queryString, setQueryString] = useState(
		`page=${table_data.page}&search=${table_data.filter_value}&per_page=${table_data.per_page}&order_column=${table_data.order_column}`
	);

	useEffect(() => {
		dispatch(FtpClientList(queryString));
	}, [dispatch, queryString]);

	// const handleSort = (column, sortDirection) => {
	// 	setSort_order(sortDirection);
	// 	tableChangeHandler({
	// 		...table_data,
	// 		sort_order: sortDirection,
	// 		order_column: column.selector,
	// 	});
	// };

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

	const filterSubmit = (e) => {
		e.preventDefault();
		console.log(e.target.shape.value, 'e.target.shape.value');
		setFilterColor(e.target.color.value);
		setFilterShape(e.target.shape.value);
		setFilterCut(e.target.cut.value);
		tableChangeHandler({
			...table_data,
			color: e.target.color.value,
			shape: e.target.shape.value,
			cut: e.target.cut.value,
		});
	};

	//
	// const handleFilter = (e) => {
	// 	let value = e.target.value;
	// 	tableChangeHandler({ ...table_data, filter_value: value });
	// 	setFilter_value(value);

	// };
	// ** Custom Pagination
	const CustomPagination = () => {
		// const count = Number(Math.ceil(store.total / rowsPerPage));
		const count = paginationCount;
		// return (
		// 	<ReactPaginate
		// 		previousLabel={''}
		// 		nextLabel={''}
		// 		pageCount={count || 1}
		// 		activeClassName={'active'}

		// 		forcePage={currentPage !== 0 ? currentPage - 1 : 0}
		// 		onPageChange={(page) => handlePagination(page)}
		// 		pageClassName={'page-item'}
		// 		nextLinkClassName={'page-link'}
		// 		nextClassName={'page-item next'}
		// 		previousClassName={'page-item prev'}
		// 		previousLinkClassName={'page-link'}
		// 		pageLinkClassName={'page-link'}

		// 		containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
		// 	/>
		// );
	};

	useEffect(() => {
		dispatch(FtpClientList());
	}, []);

	return (
		<Fragment>
			{/* <Card>
				<CardHeader>
					<CardTitle tag="h4">Search Filter</CardTitle>
				</CardHeader>
				<CardBody>
					<Form onSubmit={(e) => filterSubmit(e)}>
						<Row>
							<Col lg="3" md="6">
								<Label for="color">Color:</Label>
								<Input id="color" name="color" placeholder="Enter Color" />
							</Col>
							<Col lg="3" md="6">
								<Label for="shape">Shape:</Label>
								<Input type="text" id="shape" name="shape" placeholder="Enter Shape" />
							</Col>
							<Col lg="3" md="6">
								<Label for="cut">Cut:</Label>
								<Input type="text" name="cut" placeholder="Enter Cut" />
							</Col>
							<Col lg="3" md="6">
								<Label for="cut"></Label>
								<Button.Ripple type="submit" color="primary" block>
									Filter
								</Button.Ripple>
							</Col>
						</Row>
					</Form>
				</CardBody>
			</Card> */}
			<Card>
				<DataTable
					noHeader
					pagination
					subHeader
					responsive
					paginationServer
					columns={columns}
					data={ftpData.results}
					paginationTotalRows={ftpData.count}
					paginationRowsPerPageOptions={datatable_per_raw}
					onChangeRowsPerPage={handlePerRowsChange}
					onChangePage={handlePageChange}
					sortIcon={<ChevronDown />}
					className="react-dataTable"
					paginationPerPage={table_data.per_page}
					progressPending={isLoading}
					// onSort={handleSort}
					// sortServer={true}
					// striped={true}
					// onChangePage={handlePageChange}
					subHeaderComponent={
						<CustomHeader
							// searchTerm={searchTerm}
							value={filter_value}
							handleFilter={handleFilter}
						/>
					}
				/>
			</Card>
		</Fragment>
	);
};

export default FtpList;
