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
import { productExcelUpload, productList, ProductResetData } from '../../../../redux/productsSlice';
import { datatable_per_page, datatable_per_raw } from '../../../../configs/constant_array';
import { Link } from 'react-router-dom';
import ProductsActionIcon from '../ProductsActionIcon';

// // ** Table Header

const ProductsList = (props) => {
	const statusObj = {
		active: 'light-success',
		inactive: 'light-danger',
	};

	const columns = [
		{
			name: 'Sku',
			minWidth: '130px',
			selector: 'sku',
			sortable: true,
			sticky: true,
			center: true,
			style: {
				// position:"absolute",
				// left: 20,
				// overflow:"hidden"
			},
			cell: (row) => row.sku,
		},
		{
			name: 'Shape',
			minWidth: '50px',
			selector: 'shape',
			sortable: true,
			center: true,
			style: {
				// marginLeft:169,
			},
			cell: (row) => row.shape,
		},
		{
			name: 'Carat',
			minWidth: '50px',
			selector: 'carat',
			sortable: true,
			center: true,
			cell: (row) => row.carat,
		},
		{
			name: 'Color',
			minWidth: '130px',
			selector: 'color',
			sortable: true,
			center: true,
			cell: (row) => row.color,
		},
		{
			name: 'Measurement',
			minWidth: '160px',
			selector: 'measurement',
			sortable: true,
			center: true,
			cell: (row) => row.measurement,
		},
		{
			name: 'Price($)',
			minWidth: '120px',
			selector: 'price',
			sortable: true,
			center: true,
			cell: (row) => row.price.toLocaleString('en-US'),
		},

		{
			name: 'Certificate No',
			minWidth: '175px',
			selector: 'certificate_no',
			sortable: true,
			cell: (row) => row.certificate_no,
		},

		{
			name: 'Lab',
			minWidth: '80px',
			selector: 'lab',
			sortable: true,
			center: true,
			cell: (row) => row.lab,
		},

		{
			name: 'Cut',
			minWidth: '40px',
			selector: 'cut',
			sortable: true,
			center: true,
			cell: (row) => (row.cut == '' ? '-' : row.cut),
		},

		{
			name: 'Dept',
			minWidth: '60px',
			selector: 'dept',
			sortable: true,
			center: true,
			cell: (row) => (row.dept == '' ? '-' : row.dept),
		},

		{
			name: 'Fl',
			minWidth: '60px',
			selector: 'fl',
			sortable: true,
			center: true,
			cell: (row) => (row.fl == '' ? '-' : row.fl),
		},

		{
			name: 'Girdle',
			minWidth: '150px',
			selector: 'girdle',
			sortable: true,
			center: true,
			cell: (row) => (row.girdle == '' ? '-' : row.girdle),
		},

		{
			name: 'Cul',
			minWidth: '70px',
			selector: 'cul',
			sortable: true,
			center: true,
			cell: (row) => (row.cul == '' ? '-' : row.cul),
		},

		{
			name: 'Pol',
			minWidth: '70px',
			selector: 'pol',
			sortable: true,
			center: true,
			cell: (row) => (row.pol == '' ? '-' : row.pol),
		},

		{
			name: 'Rap',
			minWidth: '70px',
			selector: 'rap',
			sortable: true,
			center: true,
			cell: (row) => (row.rap == '' ? '-' : row.rap),
		},

		{
			name: 'Sym',
			minWidth: '70px',
			selector: 'sym',
			sortable: true,
			center: true,
			cell: (row) => (row.sym == '' ? '-' : row.sym),
		},

		// {
		// 	name: 'Status',
		// 	minWidth: '100px',
		// 	selector: 'is_active',
		// 	sortable: true,
		// 	cell: (row) => (
		// 		<Badge
		// 			className="text-capitalize"
		// 			color={statusObj[row.is_active === true ? 'active' : 'inactive']}
		// 			pill
		// 		>
		// 			{row.is_active === true ? 'active' : 'inactive'}
		// 		</Badge>
		// 	),
		// },

		{
			name: 'Actions',
			minWidth: '140px',
			center: true,
			cell: (row) => {
				// console.log("row called------------------")
				return (
					<div className="d-inline ">
						<ProductsActionIcon clickOpenGallarey={(row) => props.clickOpenGallarey(row)} row={row}   id={row.id} />
					</div>
				);
			},
		},
	];

	const dispatch = useDispatch();

	const { productData, isLoading } = useSelector((state) => state.products);

	const [limit, setPerPage] = useState(datatable_per_page);

	const [sort_order, setSort_order] = useState('desc');
	const [filterColor, setFilterColor] = useState('');
	const [filterShape, setFilterShape] = useState('');
	const [filter_value, setFilter_value] = useState('');
	const [filterCut, setFilterCut] = useState('');

	const table_data = {
		page: 1,
		per_page: limit,
		sort_order: sort_order,
		color: filterColor,
		shape: filterShape,
		cut: filterCut,
		search: filter_value,
		order_column: 'updated_at',
	};

	const [queryString, setQueryString] = useState(
		`page=${table_data.page}&color=${table_data.color}&shape=${table_data.shape}&cut=${table_data.cut}&per_page=${table_data.per_page}&order_column=${table_data.order_column}&search=${table_data.search}`
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

	const handleFilter = (e) => {
		let value = e.target.value;
		tableChangeHandler({ ...table_data, search: value });
		setFilter_value(value);
	};
	
	useEffect(() => {
		dispatch(productList());
	}, []);

	const dynamicHeight = Math.min(productData?.results?.length * 3 + 1, 70) + 'vh';
	return (
		<Fragment>
			<Card className="deskboard_card">
				<CardBody className="deskboard_card_body">
					<Row>
						<Col
							xl="6"
							// className="d-flex justify-content-lg-start align-items-center justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
						>
							<h3>Products List</h3>
						</Col>

						<Col
							xl="6"
							className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
						>
							<Input
								id="search-invoice"
								className="ml-50 w-100 form-control-sm product_search_button"
								type="text"
								size="sm"
								name="search"
								onChange={handleFilter}
								placeholder="Search"
							/>
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
					data={productData.results}
					paginationTotalRows={productData.count}
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

export default ProductsList;
