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
import {
	excelTypeOneReset,
	productExcelUpload,
	productList,
} from '../../../../redux/productsSlice';
import { datatable_per_page, datatable_per_raw } from '../../../../configs/constant_array';
import { Link } from 'react-router-dom';

// ** Table Header
const CustomHeader = ({ handlePerPage, limit, handleFilter, searchTerm, ExcelTypeOne }) => {
	// const inputRef = useRef(null);
	return (
		<div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75">
			<Row>
				<Col
					xl="6"
					className="d-flex justify-content-lg-start justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
				>
					<h1>Products List</h1>
				</Col>
				<Col
					xl="6"
					className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
				>
					<Button.Ripple tag={Label} className="ml-2" color="secondary" caret outline>
						<Share size={15} />
						Import
						<Input type="file" onChange={ExcelTypeOne} webkitdirectory mozdirectory hidden />
					</Button.Ripple>
					<Button className="ml-2" color="primary">
						<Plus size={15} />
						<span className="align-middle ml-50">Create</span>
					</Button>
				</Col>
			</Row>
		</div>
	);
};

const roleOptions = [
	{ value: '', label: 'Select Role' },
	{ value: 'admin', label: 'Admin' },
	{ value: 'author', label: 'Author' },
	{ value: 'editor', label: 'Editor' },
	{ value: 'maintainer', label: 'Maintainer' },
	{ value: 'subscriber', label: 'Subscriber' },
];

const ProductsList = () => {
	// ** Store Vars
	const dispatch = useDispatch();

	const { productData, isLoading } = useSelector((state) => state.products);

	const [limit, setPerPage] = useState(datatable_per_page);

	const [sort_order, setSort_order] = useState('desc');
	const [filterColor, setFilterColor] = useState('');
	const [filterShape, setFilterShape] = useState('');

	const [filterCut, setFilterCut] = useState('');

	const table_data = {
		page: 1,
		per_page: limit,
		sort_order: sort_order,
		color: filterColor,
		shape: filterShape,
		cut: filterCut,
		order_column: 'updated_at',
	};

	const [queryString, setQueryString] = useState(
		`page=${table_data.page}&color=${table_data.color}&shape=${table_data.shape}&cut=${table_data.cut}&per_page=${table_data.per_page}&order_column=${table_data.order_column}`
	);

	useEffect(() => {
		dispatch(productList(queryString));
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

	const filterSubmit = (e) => {
		e.preventDefault();
		console.log(e.target.ftp.value, 'e.target.shape.value');
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

	const ExcelTypeOne = (e) => {
		const files = e.target.files[0];
		let formData = new FormData();
		formData.append('file', files);
		dispatch(productExcelUpload(formData));
	};

	useEffect(() => {
		dispatch(productList());
	}, []);

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
					data={productData.results}
					paginationTotalRows={productData.count}
					paginationRowsPerPageOptions={datatable_per_raw}
					onChangeRowsPerPage={handlePerRowsChange}
					onChangePage={handlePageChange}
					sortIcon={<ChevronDown />}
					className="react-dataTable"
					paginationPerPage={table_data.per_page}
					progressPending={isLoading}
					subHeaderComponent={<CustomHeader ExcelTypeOne={ExcelTypeOne} />}
				/>
			</Card>
		</Fragment>
	);
};

export default ProductsList;
