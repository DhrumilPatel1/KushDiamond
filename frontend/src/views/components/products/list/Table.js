// ** React Imports
import { Fragment, useState, useEffect } from 'react';

// ** Columns
import { columns } from './columns';

import { useDispatch, useSelector } from 'react-redux';

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
} from 'reactstrap';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { productList } from '../../../../redux/productsSlice';
import { Link } from 'react-router-dom';

// ** Table Header
const CustomHeader = ({ handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
	return (
		<div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75">
			<Row>
				<Col xl="6" className="d-flex align-items-center p-0">
					<div className="d-flex align-items-center w-100">
						<Label for="rows-per-page">Show</Label>
						<CustomInput
							className="form-control mx-50"
							type="select"
							id="rows-per-page"
							value={rowsPerPage}
							onChange={handlePerPage}
							style={{
								width: '5rem',
								padding: '0 0.8rem',
								backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0',
							}}
						>
							<option value="10">10</option>
							<option value="25">25</option>
							<option value="50">50</option>
						</CustomInput>
						<Label for="rows-per-page">Entries</Label>
					</div>
				</Col>
				<Col
					xl="6"
					className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
				>
					<Button.Ripple tag={Label} className="ml-2" color="secondary" caret outline>
						<Share size={15} />
						Import
						<Input type="file" hidden accept="image/*" />
					</Button.Ripple>
					<Button className="ml-2" color="primary" tag={Link} to={'/products/add'}>
						<Plus size={15} />
						<span className="align-middle ml-50">Add Products</span>
					</Button>
				</Col>
			</Row>
		</div>
	);
};

const ProductsList = () => {
	// ** Store Vars
	const dispatch = useDispatch();
	const { productData } = useSelector((state) => state.products);

	// ** States
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	// ** Get data on mount
	useEffect(() => {
		dispatch(productList());
	}, []);

	// useEffect(() => {
	// 	dispatch(getAllData());
	// 	dispatch(
	// 		getData({
	// 			page: currentPage,
	// 			perPage: rowsPerPage,
	// 			role: currentRole.value,
	// 			currentPlan: currentPlan.value,
	// 			status: currentStatus.value,
	// 			q: searchTerm,
	// 		})
	// 	);
	// 	}, [dispatch, store.data.length]);

	// ** Function in get data on page change
	const handlePagination = (page) => {
		dispatch(
			getData({
				page: page.selected + 1,
				perPage: rowsPerPage,
				role: currentRole.value,
				currentPlan: currentPlan.value,
				status: currentStatus.value,
				q: searchTerm,
			})
		);
		setCurrentPage(page.selected + 1);
	};

	// ** Function in get data on rows per page
	const handlePerPage = (e) => {
		const value = parseInt(e.currentTarget.value);
		dispatch(
			getData({
				page: currentPage,
				perPage: value,
				role: currentRole.value,
				currentPlan: currentPlan.value,
				status: currentStatus.value,
				q: searchTerm,
			})
		);
		setRowsPerPage(value);
	};

	// ** Function in get data on search query change
	const handleFilter = (val) => {
		setSearchTerm(val);
		dispatch(
			getData({
				page: currentPage,
				perPage: rowsPerPage,
				role: currentRole.value,
				currentPlan: currentPlan.value,
				status: currentStatus.value,
				q: val,
			})
		);
	};

	// ** Custom Pagination
	const CustomPagination = () => {
		// const count = Number(Math.ceil(store.total / rowsPerPage));
		const count = 3;

		return (
			<ReactPaginate
				previousLabel={''}
				nextLabel={''}
				pageCount={count || 1}
				activeClassName="active"
				forcePage={currentPage !== 0 ? currentPage - 1 : 0}
				onPageChange={(page) => handlePagination(page)}
				pageClassName={'page-item'}
				nextLinkClassName={'page-link'}
				nextClassName={'page-item next'}
				previousClassName={'page-item prev'}
				previousLinkClassName={'page-link'}
				pageLinkClassName={'page-link'}
				containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
			/>
		);
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
					data={productData}
					sortIcon={<ChevronDown />}
					className="react-dataTable"
					paginationComponent={CustomPagination}
					subHeaderComponent={
						<CustomHeader
							// handlePerPage={handlePerPage}
							rowsPerPage={rowsPerPage}
							searchTerm={searchTerm}
							handleFilter={handleFilter}
						/>
					}
				/>
			</Card>
		</Fragment>
	);
};

export default ProductsList;
