// ** React Imports
import { Fragment, useState, useEffect } from 'react';
// ** Columns
// import { passData, columns } from './columns';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
// ** Third Party Components
import ReactPaginate from 'react-paginate';
import { ChevronDown, Eye, Image, Plus, Share, Trash2, Upload } from 'react-feather';
import DataTable from 'react-data-table-component';

import { Card, Input, Row, Col, Label, Button, CardBody, FormGroup } from 'reactstrap';
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import {
	ImageUploadDeleteRequest,
	productExcelUpload,
	productList,
	ProductResetData,
	ProductsMultiDeleteRequest,
} from '../../../../redux/productsSlice';
import { datatable_per_page, datatable_per_raw } from '../../../../configs/constant_array';
import { Link } from 'react-router-dom';
// import ProductsActionIcon from '../ProductsActionIcon';
import useProductData from '../../../../CustomeHook/useProductData';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ReactTooltip from 'react-tooltip';
import SingleUploadImg from '../SingleUploadImg';
import { Badge } from 'reactstrap';

const ToastSwal = withReactContent(Swal);

const ProductsList = (props) => {
	const dispatch = useDispatch();

	// const { productData, isLoading } = useSelector((state) => state.products);
	const [toggledClearRows, setToggleClearRows] = useState(false);
	const { productData, isLoading } = useProductData();
	const [selectedData, setSelectedData] = useState();
	const [selectedStatusData, setSelectedStatusData] = useState();
	const [limit, setPerPage] = useState(datatable_per_page);
	const [sort_order, setSort_order] = useState('desc');
	const [filterColor, setFilterColor] = useState('');
	const [filterShape, setFilterShape] = useState('');
	const [filter_value, setFilter_value] = useState('');
	const [filterCut, setFilterCut] = useState('');
	const [columns, setColumns] = useState([]);

	const handleDeleteById = (id) => {
		ToastSwal.fire({
			title: 'Are you sure?',
			text: 'Once deleted, you will not be able to recover This images!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			customClass: {
				confirmButton: 'btn btn-primary',
				cancelButton: 'btn btn-outline-danger ml-1',
			},
			buttonsStyling: false,
		}).then((deleteRecord) => {
			if (deleteRecord.value) {
				dispatch(ImageUploadDeleteRequest(id));
			}
		});
	};

	const ColumnList = () => {
		const column = [
			{
				name: 'Title',
				minWidth: '350px',
				selector: 'title',
				// sortable: true,
				// center: true,
				cell: (row) => row.title,
			},
			{
				name: 'Sku',
				minWidth: '130px',
				selector: 'sku',
				sortable: true,
				center: true,
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
				right: true,
				cell: (row) => row.carat,
			},
			{
				name: 'Color',
				minWidth: '130px',
				selector: 'color',
				sortable: true,
				center: true,
				cell: (row) => (row.color == '' ? '-' : row.color),
			},
			{
				name: 'Clarity',
				minWidth: '80px',
				selector: 'clarity',
				sortable: true,
				center: true,
				cell: (row) => row.clarity,
			},
			{
				name: 'Measurement',
				minWidth: '170px',
				selector: 'measurement',
				// sortable: true,
				center: true,
				cell: (row) => row.measurement,
			},
			{
				name: 'Price($)',
				minWidth: '110px',
				selector: 'price_ct',
				sortable: true,
				// center: true,
				right: true,
				cell: (row) => row.price_ct.toLocaleString('en-US'),
			},

			{
				name: 'Certificate No',
				minWidth: '175px',
				selector: 'certificate_no',
				sortable: true,
				center: true,
				cell: (row) => row.certificate_no,
			},

			{
				name: 'Lab',
				minWidth: '80px',
				selector: 'lab',
				// sortable: true,
				center: true,
				cell: (row) => row.lab,
			},

			{
				name: 'TBL',
				minWidth: '80px',
				selector: 'tbl',
				// sortable: true,
				center: true,
				cell: (row) => row.tbl,
			},

			{
				name: 'Cut',
				minWidth: '130px',
				selector: 'cut',
				// sortable: true,
				center: true,
				cell: (row) => (row.cut == '' ? '-' : row.cut),
			},

			{
				name: 'Dept',
				minWidth: '110px',
				selector: 'dept',
				sortable: true,
				cell: (row) => (row.dept == '' ? '-' : row.dept),
			},

			{
				name: 'Fl',
				minWidth: '60px',
				selector: 'fl',
				// sortable: true,
				center: true,
				cell: (row) => (row.fl == '' ? '-' : row.fl),
			},

			{
				name: 'Girdle',
				minWidth: '150px',
				selector: 'girdle',
				// sortable: true,
				center: true,
				cell: (row) => (row.girdle == '' ? '-' : row.girdle),
			},

			{
				name: 'Cul',
				minWidth: '70px',
				selector: 'cul',
				// sortable: true,
				center: true,
				cell: (row) => (row.cul == '' ? '-' : row.cul),
			},

			{
				name: 'Pol',
				minWidth: '70px',
				selector: 'pol',
				// sortable: true,
				center: true,
				cell: (row) => (row.pol == '' ? '-' : row.pol),
			},

			{
				name: 'Rap',
				minWidth: '70px',
				selector: 'rap',
				// sortable: true,
				center: true,
				cell: (row) => (row.rap == '' ? '-' : row.rap),
			},

			{
				name: 'Sym',
				minWidth: '70px',
				selector: 'sym',
				// sortable: true,
				center: true,
				cell: (row) => (row.sym == '' ? '-' : row.sym),
			},

			{
				name: 'Shopify Product Id',
				minWidth: '220px',
				selector: 'shopify_product_id',
				sortable: true,
				// center: true,
				right: true,
				cell: (row) => row.shopify_product_id,
			},

			{
				name: 'Available Status',
				minWidth: '180px',
				selector: 'avalibity_status',
				center: true,
				cell: (row) =>
					row.avalibity_status == 'True' ? (
						<Badge color="success">YES</Badge>
					) : (
						<Badge color="danger">NO</Badge>
					),
			},

			{
				name: 'Actions',
				minWidth: '180px',
				cell: (row) => {
					return (
						<>
							<div className="d-inline ">
								{row?.product_images?.length > 0 ? (
									<>
										<Image
											data-tip
											data-for="view_gallery"
											size={18}
											className="outline-none text-dark ml-2"
											onClick={() => props.clickOpenGallarey(row.product_images)}
											style={{ cursor: 'pointer' }}
										/>

										<ReactTooltip
											id="view_gallery"
											className="tooltip_info"
											place="top"
											effect="solid"
										>
											View Gallary
										</ReactTooltip>
									</>
								) : (
									<Image
										size={18}
										className="outline-none text-dark ml-2 gallary_disabled"
										style={{ cursor: 'not-allowed' }}
									/>
								)}
							</div>

							<Link to={`/products/detail/${row.id}`} className="text-primary">
								<Eye size={18} className="ml-1 outline-none" data-tip data-for="view_product" />
							</Link>
							<ReactTooltip id="view_product" className="tooltip_info" place="top" effect="solid">
								View Product
							</ReactTooltip>
							<SingleUploadImg />

							{props.getLoginData?.role === 'admin' ? (
								row?.product_images?.length > 0 ? (
									<>
										<Trash2
											className="text-danger ml-1 text-white bg-white"
											data-tip
											data-for="images_delete"
											size={18}
											onClick={() => handleDeleteById(row.id)}
											style={{
												cursor: 'pointer',
												outline: 'none',
											}}
										/>

										<ReactTooltip
											id="images_delete"
											className="tooltip_info"
											place="top"
											effect="solid"
										>
											Delete Images
										</ReactTooltip>
									</>
								) : (
									<Trash2
										className="text-danger ml-1 text-white bg-white trash_disabled"
										data-tip
										data-for="images_delete"
										size={18}
										style={{ cursor: 'not-allowed' }}
									/>
								)
							) : null}
						</>
					);
				},
			},
		];

		setColumns(column);
	};

	const table_data = {
		page: 1,
		per_page: limit,
		sort_order: sort_order,
		color: filterColor,
		shape: filterShape,
		cut: filterCut,
		search: filter_value,
		order_column: 'created_at',
	};

	const [queryString, setQueryString] = useState(
		`page=${table_data.page}&color=${table_data.color}&shape=${table_data.shape}&cut=${table_data.cut}&per_page=${table_data.per_page}&order_column=${table_data.order_column}&search=${table_data.search}`
	);

	useEffect(async () => {
		dispatch(productList(queryString));
		ColumnList();
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

	const selectRows = (state) => {
		setSelectedData(state.selectedRows);
		setSelectedStatusData(state.selectedRows);
	};

	const multiDeleteData = (e, selectedData) => {
		ToastSwal.fire({
			title: 'Are you sure?',
			text: 'Once deleted, you will not be able to recover This data!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			customClass: {
				confirmButton: 'btn btn-primary',
				cancelButton: 'btn btn-outline-danger ml-1',
			},
			buttonsStyling: false,
		}).then((deleteRecord) => {
			if (deleteRecord?.value) {
				const multiid = selectedData?.map((e) => e.id);
				const multiDeleteIds = {
					id: multiid,
					key: e.target.value,
				};

				dispatch(ProductsMultiDeleteRequest(multiDeleteIds));
				setToggleClearRows(!toggledClearRows);
			}
			setToggleClearRows(!toggledClearRows);
		});
	};

	const multinotAvailableProduct = (e, selectStatus) => {
		ToastSwal.fire({
			title: 'Are you sure?',
			text: 'These selected items will be marked as Not Available',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes',
			customClass: {
				confirmButton: 'btn btn-primary',
				cancelButton: 'btn btn-outline-danger ml-1',
			},
			buttonsStyling: false,
		}).then((deleteRecord) => {
			if (deleteRecord?.value) {
				const multiid = selectStatus?.map((e) => e.id);
				const multiDeleteIds = {
					id: multiid,
					key: e.target.value,
				};

				dispatch(ProductsMultiDeleteRequest(multiDeleteIds));
				setToggleClearRows(!toggledClearRows);
			}
			setToggleClearRows(!toggledClearRows);
		});
	};

	const dynamicHeight = Math.min(productData?.results?.length * 3 + 1, 70) + 'vh';
	return (
		<Fragment>
			<Card className="deskboard_card">
				<CardBody className="deskboard_card_body">
					<Row>
						<Col xl="4">
							<h3>Products List</h3>
							{selectedData?.length > 0 ? (
								<Button.Ripple
									size="sm"
									onClick={(e) => multiDeleteData(e, selectedData)}
									value="delete"
									className="btn-danger"
									style={{ cursor: 'pointer' }}
								>
									Delete
								</Button.Ripple>
							) : null}

							{selectedStatusData?.length > 0 ? (
								<Button.Ripple
									size="sm"
									onClick={(e) => multinotAvailableProduct(e, selectedStatusData)}
									className="ml-2"
									value="not_avalible"
									style={{ cursor: 'pointer' }}
								>
									NA
								</Button.Ripple>
							) : null}
						</Col>

						<Col xl="8" className="d-flex align-items-sm-center justify-content-lg-end">
							<Col lg="2" className="px-0">
								<Button.Ripple
									size="sm"
									className="w-100 form-control-sm "
									tag={Link}
									to="/product/excel"
								>
									Product Excel
								</Button.Ripple>
							</Col>

							<Col lg="2 px-0" className="px-0">
								<Button.Ripple
									size="sm"
									color="danger"
									className="ml-1 w-100 form-control-sm "
									tag={Link}
									to="/product/inventory"
								>
									Inventory Excel
								</Button.Ripple>
							</Col>

							<Col lg="2" className="px-0">
								<Button.Ripple
									size="sm"
									color="success"
									className="ml-2 w-100 form-control-sm "
									tag={Link}
									to="/shopifySync"
								>
									Shopify Sync
								</Button.Ripple>
							</Col>

							<Col lg="4">
								<Input
									id="search-invoice"
									className="ml-2 w-100 form-control-sm"
									type="text"
									size="sm"
									name="search"
									onChange={handleFilter}
									placeholder="Search"
								/>
							</Col>
						</Col>
					</Row>
				</CardBody>

				<DataTable
					noHeader
					pagination
					selectableRows={props.getLoginData?.role === 'admin' ? true : false}
					clearSelectedRows={toggledClearRows}
					onSelectedRowsChange={selectRows}
					responsive
					paginationServer
					columns={columns}
					data={productData?.results}
					paginationTotalRows={productData?.count}
					paginationRowsPerPageOptions={datatable_per_raw}
					onChangeRowsPerPage={handlePerRowsChange}
					onChangePage={handlePageChange}
					sortIcon={<ChevronDown />}
					className="react-dataTable"
					paginationPerPage={table_data.per_page}
					progressPending={isLoading}
					fixedHeader
					fixedHeaderScrollHeight={dynamicHeight}
				/>
			</Card>
		</Fragment>
	);
};

export default ProductsList;
