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
	ProductResetData,
} from '../../../../redux/productsSlice';
import { datatable_per_page, datatable_per_raw } from '../../../../configs/constant_array';
import { Link } from 'react-router-dom';

// ** Table Header
const CustomHeader = ({ handlePerPage, limit, handleFilter, searchTerm, ExcelTypeOne }) => {
	return (
		<div className="invoice-list-table-header w-100 mr-1 ml-50">
			<Row>
				<Col
					xl="6"
					className="d-flex justify-content-lg-start align-items-center justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
				>
					<h3 className='header_text_size'>Products List</h3>
				</Col>
				<Col
					xl="6"
					className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
				>
					<Button.Ripple tag={Label} className="ml-2" size="sm" color="secondary" caret outline>
						<Share size={15} />
						Import Excel
						<Input type="file" onChange={ExcelTypeOne} hidden />
					</Button.Ripple>
					{/* <Button className="ml-2" color="primary" size="sm" tag={Link} to="/dashboard">
						<Plus size={15} />
						<span className="align-middle ml-50">Create</span>
					</Button> */}
				</Col>
			</Row>
		</div>
	);
};

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

	const dynamicHeight = Math.min(productData?.results?.length * 4 + 1, 70) + 'vh'

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
								<Label for="color">Ftp :</Label>
								<Select
									isClearable={false}
									className="react-select"
									classNamePrefix="select"
									options={roleOptions}
									name="ftp"
								/>
							</Col>
							<Col lg="2" md="6">
								<Label for="color">Color :</Label>
								<Input id="color" name="color" placeholder="Enter Color" />
							</Col>
							<Col lg="2" md="6">
								<Label for="shape">Shape :</Label>
								<Input type="text" id="shape" name="shape" placeholder="Enter Shape" />
							</Col>
							<Col lg="2" md="6">
								<Label for="cut">Cut :</Label>
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
					data={productData.results}
					paginationTotalRows={productData.count}
					paginationRowsPerPageOptions={datatable_per_raw}
					onChangeRowsPerPage={handlePerRowsChange}
					onChangePage={handlePageChange}
					sortIcon={<ChevronDown />}
					className="react-dataTable"
					paginationPerPage={table_data.per_page}
					progressPending={isLoading}
					fixedHeader
					fixedHeaderScrollHeight={dynamicHeight}
					subHeaderComponent={<CustomHeader ExcelTypeOne={ExcelTypeOne} />}
				/>
			</Card>
		</Fragment>
	);
};

export default ProductsList;
