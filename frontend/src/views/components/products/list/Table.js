// ** React Imports
import { Fragment, useState, useEffect } from 'react';
// ** Columns
// import { passData, columns } from './columns';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
// ** Third Party Components
import ReactPaginate from 'react-paginate';
import {
	CheckCircle,
	ChevronDown,
	Eye,
	FileText,
	Image,
	Link2,
	Plus,
	Share,
	Slash,
	Trash,
	Trash2,
	Upload,
} from 'react-feather';
import DataTable from 'react-data-table-component';
import {
	Card,
	Input,
	Row,
	Col,
	Label,
	Button,
	CardBody,
	ButtonGroup,
	CardHeader,
	CardTitle,
} from 'reactstrap';
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import {
	ImageUploadDeleteRequest,
	productCsvListData,
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
import { selectThemeColors } from '@utils';

const ToastSwal = withReactContent(Swal);

const ProductsList = (props) => {
	const dispatch = useDispatch();

	// const { productData, isLoading } = useProductData();
	const { productData, isLoading, productCsvData } = useSelector((state) => state.products);
	console.log({ productCsvData });

	const productCsvArray = productCsvData?.data?.map((ele) => {
		let productObj = {
			sku: ele.sku,
			avalibity_status: ele.avalibity_status,
			shape: ele.shape,
			carat: ele.carat,
			color: ele.color,
			clarity: ele.clarity,
			measurement: ele.measurement,
			price: ele.price,
			certificate_no: ele.certificate_no,
			lab: ele.lab,
			tbl: ele.tbl,
			cut: ele.cut,
			dept: ele.dept,
			fl: ele.fl,
			girdle: ele.girdle,
			cul: ele.cul,
			pol: ele.pol,
			rap: ele.rap,
			sym: ele.sym,
			title: ele.title,
		};
		return productObj;
	});

	const [toggledClearRows, setToggleClearRows] = useState(false);
	const [selectedData, setSelectedData] = useState([]);

	const [limit, setPerPage] = useState(datatable_per_page);
	const [sort_order, setSort_order] = useState('desc');
	const [checkStatus, setCheckStatus] = useState('');
	const [filter_value, setFilter_value] = useState('');
	const [columns, setColumns] = useState([]);

	const statusOptions = [
		{ value: '', label: 'Select All Availability' },
		{ value: 'True', label: 'Available' },
		{ value: 'False', label: 'Unavailable' },
	];

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
				name: 'Sku',
				minWidth: '110px',
				selector: 'sku',
				sortable: true,
				center: true,
				cell: (row) => row.sku,
			},

			{
				name: 'Available ?',
				minWidth: '130px',
				selector: 'avalibity_status',
				center: true,
				cell: (row) =>
					row.avalibity_status == 'True' ? (
						<Badge color="light-success">
							<CheckCircle size={12} className="align-middle" />
							<span className="align-middle ml-25">YES</span>
						</Badge>
					) : (
						<Badge color="light-danger">
							<Slash size={12} className="align-middle" />
							<span className="align-middle ml-25">NO</span>
						</Badge>
					),
			},

			{
				name: 'Actions',
				minWidth: '240px',
				center: true,
				cell: (row) => {
					return (
						<>
							<div className="d-inline">
								{row?.product_images?.length > 0 ? (
									<>
										<Image
											data-tip
											data-for={`view_images${row.sku}`}
											size={18}
											className="outline-none text-dark"
											onClick={() => props.clickOpenGallarey(row.product_images)}
											style={{ cursor: 'pointer' }}
										/>

										<ReactTooltip
											id={`view_images${row.sku}`}
											className="tooltip_info"
											place="top"
											effect="solid"
										>
											View gallery for {row.sku}
										</ReactTooltip>
									</>
								) : (
									<Image
										size={18}
										className="outline-none text-dark  gallary_disabled"
										style={{ cursor: 'not-allowed' }}
									/>
								)}
							</div>

							<Link to={`/products/detail/${row.id}`} className="text-primary">
								<Eye
									size={18}
									className="ml-2 outline-none"
									data-tip
									data-for={`view_product${row.sku}`}
								/>
							</Link>
							<ReactTooltip
								id={`view_product${row.sku}`}
								className="tooltip_info"
								place="top"
								effect="solid"
							>
								View product for {row.sku}
							</ReactTooltip>
							<SingleUploadImg row={row} />

							{props.getLoginData?.role === 'admin' ? (
								row?.product_images?.length > 0 ? (
									<>
										<Trash2
											className="text-danger ml-2 text-white bg-white"
											data-tip
											data-for={`delete_image${row.sku}`}
											size={18}
											onClick={() => handleDeleteById(row.id)}
											style={{
												cursor: 'pointer',
												outline: 'none',
											}}
										/>

										<ReactTooltip
											id={`delete_image${row.sku}`}
											className="tooltip_info"
											place="top"
											effect="solid"
										>
											Delete images for {row.sku}
										</ReactTooltip>
									</>
								) : (
									<Trash2
										className="text-danger ml-2 text-white bg-white trash_disabled"
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

			{
				name: 'Shape',
				minWidth: '60px',
				selector: 'shape',
				sortable: true,
				center: true,
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
				minWidth: '160px',
				selector: 'color',
				sortable: true,
				center: true,
				cell: (row) => (row.color == '' ? '-' : row.color),
			},
			{
				name: 'Clarity',
				minWidth: '120px',
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
				selector: 'price',
				sortable: true,
				// center: true,
				right: true,
				cell: (row) => row.price.toLocaleString('en-US'),
			},

			{
				name: 'Certificate No',
				minWidth: '175px',
				selector: 'certificate_no',
				sortable: true,
				center: true,
				cell: (row) => (row.certificate_no == '' ? '-' : row.certificate_no),
			},

			{
				name: 'Lab',
				minWidth: '80px',
				selector: 'lab',
				// sortable: true,
				center: true,
				cell: (row) => (row.lab == '' ? '-' : row.lab),
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
				minWidth: '160px',
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
		];

		setColumns(column);
	};

	const table_data = {
		page: 1,
		per_page: limit,
		sort_order: sort_order,
		search: filter_value,
		avalibity_status: checkStatus ? checkStatus.value : '',
		order_column: 'created_at',
	};

	const [queryString, setQueryString] = useState(
		`page=${table_data.page}&per_page=${table_data.per_page}&order_column=${table_data.order_column}&search=${table_data.search}&avalibity_status=${table_data.avalibity_status}`
	);

	useEffect(() => {
		dispatch(productList(queryString));
		ColumnList();
		dispatch(productCsvListData());
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

	const handleCheckStatus = (e) => {
		tableChangeHandler({
			...table_data,
			avalibity_status: e.value == '' ? '' : e.value,
		});
		setCheckStatus(e);
	};

	const selectRows = (state) => {
		setSelectedData(state.selectedRows);
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
					key: 'delete',
				};

				dispatch(ProductsMultiDeleteRequest(multiDeleteIds));
				setToggleClearRows(!toggledClearRows);
				setSelectedData([]);
			}
			setToggleClearRows(!toggledClearRows);
			setSelectedData([]);
		});
	};

	const multinotAvailableProduct = (e, selectedData) => {
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
				const multiid = selectedData?.map((e) => e.id);
				const multiNAStatus = {
					id: multiid,
					key: 'not_avalible',
				};
				dispatch(ProductsMultiDeleteRequest(multiNAStatus));
				setToggleClearRows(!toggledClearRows);
				setSelectedData([]);
			}
			setToggleClearRows(!toggledClearRows);
			setSelectedData([]);
		});
	};

	const multiAvailableProduct = (e, selectedData) => {
		ToastSwal.fire({
			title: 'Are you sure?',
			text: 'These selected items will be marked as available',
			icon: 'success',
			showCancelButton: true,
			confirmButtonText: 'Yes',
			customClass: {
				confirmButton: 'btn btn-primary',
				cancelButton: 'btn btn-outline-danger ml-1',
			},
			buttonsStyling: false,
		}).then((deleteRecord) => {
			if (deleteRecord?.value) {
				const multiid = selectedData?.map((e) => e.id);
				const multiAvailableStatus = {
					id: multiid,
					key: 'avalible',
				};
				dispatch(ProductsMultiDeleteRequest(multiAvailableStatus));
				setToggleClearRows(!toggledClearRows);
			}
			setToggleClearRows(!toggledClearRows);
		});
	};

	// const conditionalRowStyles = [
	// 	{
	// 		when: (row) => row.sku,
	// 		style: {
	// 			'&:hover': {
	// 				cursor: 'pointer',
	// 				backgroundColor: 'rgba(63, 195, 128, 0.9)',
	// 				minHeight: 'auto !important',
	// 			},
	// 		},
	// 	},

	// ];

	const convertArrayOfObjectsToCSV = () => {
		let result;

		const columnDelimiter = ',';
		const lineDelimiter = '\n';
		const keys = Object.keys(productCsvArray[0]);

		result = '';
		result += keys.join(columnDelimiter);
		result += lineDelimiter;

		productCsvArray.forEach((item) => {
			let ctr = 0;
			keys.forEach((key) => {
				if (ctr > 0) result += columnDelimiter;

				result += item[key];

				ctr++;
			});
			result += lineDelimiter;
		});

		return result;
	};

	const downloadCSV = () => {
		const link = document.createElement('a');
		let csv = convertArrayOfObjectsToCSV();
		if (csv === null) return;

		const filename = 'Product.csv';

		if (!csv.match(/^data:text\/csv/i)) {
			csv = `data:text/csv;charset=utf-8,${csv}`;
		}

		link.setAttribute('href', encodeURI(csv));
		link.setAttribute('download', filename);
		link.click();
	};

	const dynamicHeight = Math.min(productData?.results?.length * 3 + 1, 70) + 'vh';
	return (
		<Fragment>
			<Card className="deskboard_card">
				<CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom py-1">
					<CardTitle tag="h4" style={{ fontSize: '25px' }}>
						All Products List
					</CardTitle>
					<div className="d-flex mt-md-0 mt-1">
						<div>
							<Button.Ripple
								color="secondary"
								size="sm"
								onClick={() => downloadCSV()}
								caret
								outline
							>
								<Share size={15} />
								<span className="align-middle ml-50">Product Export CSV</span>
							</Button.Ripple>
						</div>
					</div>
				</CardHeader>
				<CardBody className="deskboard_card_body">
					<Row>
						<Col xl="4" className="my-1">
							<ButtonGroup>
								{selectedData?.length > 0 ? (
									<Button.Ripple
										size="sm"
										data-tip
										data-for="remove_products"
										onClick={(e) => multiDeleteData(e, selectedData)}
										value="delete"
										outline
										color="primary"
										style={{ cursor: 'pointer' }}
									>
										<Trash2 className="text-danger" size={20} />
										<ReactTooltip
											id="remove_products"
											className="tooltip_info"
											place="top"
											effect="solid"
										>
											Remove Products
										</ReactTooltip>
									</Button.Ripple>
								) : (
									<>
										<Button.Ripple
											size="sm"
											data-tip
											data-for="remove_products"
											value="delete"
											outline
											color="primary"
											style={{ cursor: 'pointer' }}
										>
											<Trash2
												className="text-danger"
												style={{ cursor: 'pointer', opacity: '0.6' }}
												size={20}
											/>
										</Button.Ripple>
										<ReactTooltip
											id="remove_products"
											className="tooltip_info"
											place="top"
											effect="solid"
										>
											Remove Products
										</ReactTooltip>
									</>
								)}

								{selectedData?.length > 0 ? (
									<Button.Ripple
										size="sm"
										data-tip
										data-for="unavailable_products"
										onClick={(e) => multinotAvailableProduct(e, selectedData)}
										value="not_avalible"
										outline
										color="primary"
										style={{ cursor: 'pointer' }}
									>
										<Slash className="text-secondary" size={20} />
										<ReactTooltip
											id="unavailable_products"
											className="tooltip_info"
											place="top"
											effect="solid"
										>
											Mark as Unavailable
										</ReactTooltip>
									</Button.Ripple>
								) : (
									<Button.Ripple
										size="sm"
										data-tip
										data-for="unavailable_products"
										value="not_avalible"
										outline
										color="primary"
										style={{ cursor: 'pointer' }}
									>
										<Slash
											className="text-secondary"
											style={{ cursor: 'pointer', opacity: '0.6' }}
											size={20}
										/>
										<ReactTooltip
											id="unavailable_products"
											className="tooltip_info"
											place="top"
											effect="solid"
										>
											Mark as Unavailable
										</ReactTooltip>
									</Button.Ripple>
								)}

								{selectedData?.length > 0 ? (
									<Button.Ripple
										size="sm"
										data-tip
										data-for="available_products"
										onClick={(e) => multiAvailableProduct(e, selectedData)}
										outline
										color="primary"
										value="avalible"
										style={{ cursor: 'pointer' }}
									>
										<CheckCircle className="text-secondary" size={20} />
										<ReactTooltip
											id="available_products"
											className="tooltip_info"
											place="top"
											effect="solid"
										>
											Mark as Available
										</ReactTooltip>
									</Button.Ripple>
								) : (
									<Button.Ripple
										size="sm"
										data-tip
										data-for="available_products"
										outline
										color="primary"
										value="avalible"
										style={{ cursor: 'pointer' }}
									>
										<CheckCircle
											className="text-secondary"
											style={{ cursor: 'pointer', opacity: '0.6' }}
											size={20}
										/>
										<ReactTooltip
											id="available_products"
											className="tooltip_info"
											place="top"
											effect="solid"
										>
											Mark as Available
										</ReactTooltip>
									</Button.Ripple>
								)}
							</ButtonGroup>
						</Col>

						<Col xl="8" className="d-flex align-items-sm-center justify-content-lg-end my-1 px-0">
							<Col xl="4">
								<ButtonGroup>
									<Button.Ripple
										color="primary"
										style={{ padding: '10px' }}
										outline
										size="sm"
										tag={Link}
										to="/product/excel"
									>
										<Link2 size={14} />
										<span className="align-middle ml-25">Product Excel</span>
									</Button.Ripple>

									<Button.Ripple
										color="primary"
										style={{ padding: '10px' }}
										outline
										size="sm"
										tag={Link}
										to="/product/inventory"
									>
										<Link2 size={14} />
										<span className="align-middle ml-25">Inventory Excel</span>
									</Button.Ripple>
								</ButtonGroup>
							</Col>

							{/* <Col lg="2" className="px-0">
								<Button.Ripple
									size="sm"
									color="success"
									className="ml-2 w-100 form-control-sm "
									tag={Link}
									to="/shopifySync"
								>
									Shopify Sync
								</Button.Ripple>
							</Col> */}

							<Col lg="3">
								<Select
									size="sm"
									isClearable={false}
									theme={selectThemeColors}
									placeholder="Select Availability"
									className="react-select feed_select text-secondary"
									name="status"
									classNamePrefix="select"
									options={statusOptions}
									value={checkStatus}
									onChange={(e) => handleCheckStatus(e)}
								/>
							</Col>

							<Col lg="4">
								<Input
									id="search-invoice"
									className="w-100 form-control-sm"
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
					className="react-dataTable datatalbe_bg_color"
					paginationPerPage={table_data.per_page}
					progressPending={isLoading}
					// conditionalRowStyles={conditionalRowStyles}
					fixedHeader
					fixedHeaderScrollHeight={dynamicHeight}
				/>
			</Card>
		</Fragment>
	);
};

export default ProductsList;
