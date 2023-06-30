// ** React Imports
import { Fragment, useState, useEffect } from 'react';
// ** Columns
// import { passData, columns } from './columns';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
// ** Third Party Components
import ReactPaginate from 'react-paginate';
import {
	Book,
	CheckCircle,
	ChevronDown,
	ExternalLink,
	Eye,
	File,
	FileText,
	Image,
	Link2,
	Plus,
	Share,
	Slash,
	Trash,
	Trash2,
	Upload,
	XSquare,
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
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
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
	productUnavailableExcelRequest,
	productUnavailableResetMessage,
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
import { toast } from 'react-hot-toast';
import ViewImageReorder from '../ViewImageReorder';
const statusObj = {
	ACTIVE: 'light-success',
	DRAFT: 'light-danger',
};

const ToastSwal = withReactContent(Swal);

const ProductsList = (props) => {
	const dispatch = useDispatch();

	const { productData, isLoading } = useProductData();
	const { productCsvData, productUnAvailableExcelMessage } = useSelector((state) => state.products);

	const productCsvArray = productCsvData?.map((ele) => {
		let productObj = {
			'LOT NO': ele.sku,
			'IMAGE COUNT': ele.images_count,
			'VIDEO COUNT': ele.videos_count,
			SHAPE: ele.shape,
			CARAT: ele.carat,
			COLOR: ele.color,
			CLARITY: ele.clarity,
			MEASUREMENT: ele.measurement,
			PRICE: ele.price,
			'CERTIFICATE NO': ele.certificate_no,
			LAB: ele.lab,
			TBL: ele.tbl,
			CUT: ele.cut,
			DEPT: ele.dept,
			FL: ele.fl,
			GIRDLE: ele.girdle,
			CUL: ele.cul,
			POL: ele.pol,
			RAP: ele.rap,
			SYM: ele.sym,
			TITLE: ele.title,
		};
		return productObj;
	});

	const [toggledClearRows, setToggleClearRows] = useState(false);
	const [selectedData, setSelectedData] = useState([]);
	const [unavailableExcelModel, setUnavailableExcelModel] = useState(false);
	const [limit, setPerPage] = useState(datatable_per_page);
	const [sort_order, setSort_order] = useState('desc');
	const [checkStatus, setCheckStatus] = useState('');
	const [filter_value, setFilter_value] = useState('');
	const [columns, setColumns] = useState([]);
	const [excelFile, setexcelFile] = useState(false);

	const statusOptions = [
		{ value: '', label: 'Select All Availability' },
		{ value: 'True', label: 'Available' },
		{ value: 'False', label: 'Unavailable' },
		{ value: 'Memo', label: 'Memo' },
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
				const deleteImageObj = {
					product_image_id: id,
					type: 'all_image_delete',
				};

				dispatch(ImageUploadDeleteRequest(deleteImageObj));
			}
		});
	};

	const ColumnList = () => {
		const column = [
			{
				name: 'Sku',
				minWidth: '120px',
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
					) : row.avalibity_status == 'Memo' ? (
						<Badge color="light-warning">
							<Book size={12} className="align-middle" />
							<span className="align-middle ml-25">MEMO</span>
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
											View gallery for {row.sku}, Count {row.total_count}
										</ReactTooltip>
									</>
								) : (
									<Image
										size={18}
										className="outline-none text-dark gallary_disabled"
										style={{ cursor: 'not-allowed' }}
									/>
								)}
							</div>

							<Link
								to={{
									pathname: `/products/detail/${row.id}`,
									state: { row: row },
								}}
								// to={`/products/detail/${row.id}`}
								className="text-primary"
								// state={{ state: 'mystate' }}
							>
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
											Remove images for {row.sku}
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
							{/* <ViewImageReorder row={row?.product_images} rowId={row} /> */}
						</>
					);
				},
			},

			{
				name: 'Shopify Status',
				minWidth: '180px',
				selector: 'status',
				center: true,
				cell: (row) => (
					<Badge className="text-capitalize" color={statusObj[row.status]}>
						{row.status}
					</Badge>
				),
			},

			// {
			// 	name: 'SIRV Url',
			// 	minWidth: '140px',
			// 	selector: 'video_url',
			// 	center: true,
			// 	cell: (row) => {
			// 		return (
			// 			<div className="d-inline">
			// 				{row?.video_url?.length > 0 ? (
			// 					<>
			// 						{row?.video_url?.map((ele) => {
			// 							return (
			// 								<a href={ele?.sirv_video_url} target="_blank">
			// 									<ExternalLink
			// 										data-tip
			// 										data-for={`sirv_url${row.sku}`}
			// 										size={18}
			// 										className="outline-none text-dark"
			// 										style={{ cursor: 'pointer' }}
			// 									/>

			// 									<ReactTooltip
			// 										id={`sirv_url${row.sku}`}
			// 										className="tooltip_info"
			// 										place="top"
			// 										effect="solid"
			// 									>
			// 										SIRV Video URL for {row.sku}
			// 									</ReactTooltip>
			// 								</a>
			// 							);
			// 						})}
			// 					</>
			// 				) : (
			// 					<ExternalLink
			// 						size={18}
			// 						className="outline-none text-dark gallary_disabled"
			// 						style={{ cursor: 'not-allowed' }}
			// 					/>
			// 				)}
			// 			</div>
			// 		);
			// 	},
			// },

			{
				name: 'Shape',
				minWidth: '60px',
				selector: 'shape',
				sortable: true,
				center: true,
				// cell: (row) => row.shape,
				cell: (row) => {
					return (
						<>
							<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
								{row.shape}
							</div>
						</>
					);
				},
			},
			{
				name: 'Carat',
				minWidth: '50px',
				selector: 'carat',
				sortable: true,
				right: true,
				// cell: (row) => row.carat,
				cell: (row) => {
					return (
						<>
							<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
								{row.carat}
							</div>
						</>
					);
				},
			},
			{
				name: 'Color',
				minWidth: '160px',
				selector: 'color',
				sortable: true,
				center: true,
				// cell: (row) => (row.color == '' ? '-' : row.color),
				cell: (row) => {
					return (
						<>
							<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
								{row.color == '' ? '-' : row.color}
							</div>
						</>
					);
				},
			},
			{
				name: 'Clarity',
				minWidth: '120px',
				selector: 'clarity',
				sortable: true,
				center: true,
				// cell: (row) => row.clarity,
				cell: (row) => {
					return (
						<>
							<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
								{row.clarity == '' ? '-' : row.clarity}
							</div>
						</>
					);
				},
			},
			{
				name: 'Measurement',
				minWidth: '170px',
				selector: 'measurement',
				// sortable: true,
				center: true,
				// cell: (row) => row.measurement,
				cell: (row) => {
					return (
						<>
							<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
								{row.measurement == '' ? '-' : row.measurement}
							</div>
						</>
					);
				},
			},
			{
				name: 'Price($)',
				minWidth: '110px',
				selector: 'price',
				sortable: true,
				// center: true,
				right: true,
				// cell: (row) => row.price.toLocaleString('en-US'),
				cell: (row) => {
					return (
						<>
							<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
								{row.price?.toLocaleString('en-US')}
							</div>
						</>
					);
				},
			},

			{
				name: 'Certificate No',
				minWidth: '175px',
				selector: 'certificate_no',
				sortable: true,
				center: true,
				// cell: (row) => (row.certificate_no == '' ? '-' : row.certificate_no),
				cell: (row) => {
					return (
						<>
							<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
								{row.certificate_no == '' ? '-' : row.certificate_no}
							</div>
						</>
					);
				},
			},

			{
				name: 'Lab',
				minWidth: '80px',
				selector: 'lab',
				// sortable: true,
				center: true,
				// cell: (row) => (row.lab == '' ? '-' : row.lab),
				cell: (row) => {
					return (
						<>
							<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
								{row.lab == '' ? '-' : row.lab}
							</div>
						</>
					);
				},
			},

			{
				name: 'TBL',
				minWidth: '80px',
				selector: 'tbl',
				// sortable: true,
				center: true,
				// cell: (row) => row.tbl,
				cell: (row) => {
					return (
						<>
							<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
								{row.tbl == '' ? '-' : row.tbl}
							</div>
						</>
					);
				},
			},

			{
				name: 'Cut',
				minWidth: '220px',
				selector: 'cut',
				// sortable: true,
				center: true,
				// cell: (row) => (row.cut == '' ? '-' : row.cut),
				cell: (row) => {
					return (
						<>
							<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
								{row.cut == '' ? '-' : row.cut}
							</div>
						</>
					);
				},
			},

			{
				name: 'Dept',
				minWidth: '110px',
				selector: 'dept',
				sortable: true,
				// cell: (row) => (row.dept == '' ? '-' : row.dept),
				cell: (row) => {
					return (
						<>
							<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
								{row.dept == '' ? '-' : row.dept}
							</div>
						</>
					);
				},
			},

			{
				name: 'Fl',
				minWidth: '60px',
				selector: 'fl',
				// sortable: true,
				center: true,
				// cell: (row) => (row.fl == '' ? '-' : row.fl),
				cell: (row) => {
					return (
						<>
							<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
								{row.fl == '' ? '-' : row.fl}
							</div>
						</>
					);
				},
			},

			{
				name: 'Girdle',
				minWidth: '150px',
				selector: 'girdle',
				// sortable: true,
				center: true,
				// cell: (row) => (row.girdle == '' ? '-' : row.girdle),
				cell: (row) => {
					return (
						<>
							<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
								{row.girdle == '' ? '-' : row.girdle}
							</div>
						</>
					);
				},
			},

			{
				name: 'Cul',
				minWidth: '70px',
				selector: 'cul',
				// sortable: true,
				center: true,
				// cell: (row) => (row.cul == '' ? '-' : row.cul),
				cell: (row) => {
					return (
						<>
							<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
								{row.cul == '' ? '-' : row.cul}
							</div>
						</>
					);
				},
			},

			{
				name: 'Pol',
				minWidth: '70px',
				selector: 'pol',
				// sortable: true,
				center: true,
				// cell: (row) => (row.pol == '' ? '-' : row.pol),
				cell: (row) => {
					return (
						<>
							<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
								{row.pol == '' ? '-' : row.pol}
							</div>
						</>
					);
				},
			},

			{
				name: 'Rap',
				minWidth: '70px',
				selector: 'rap',
				// sortable: true,
				center: true,
				// cell: (row) => (row.rap == '' ? '-' : row.rap),
				cell: (row) => {
					return (
						<>
							<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
								{row.rap == '' ? '-' : row.rap}
							</div>
						</>
					);
				},
			},

			{
				name: 'Sym',
				minWidth: '70px',
				selector: 'sym',
				// sortable: true,
				center: true,
				// cell: (row) => (row.sym == '' ? '-' : row.sym),
				cell: (row) => {
					return (
						<>
							<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
								{row.sym == '' ? '-' : row.sym}
							</div>
						</>
					);
				},
			},

			{
				name: 'Shopify Product Id',
				minWidth: '220px',
				selector: 'shopify_product_id',
				sortable: true,
				// center: true,
				right: true,
				// cell: (row) => row.shopify_product_id,
				cell: (row) => {
					return (
						<div data-tip data-for={`${row.sku}`} className="cursor-pointer">
							{row.shopify_product_id}
						</div>
					);
				},
			},
			{
				cell: (row) => {
					return (
						<ReactTooltip id={`${row.sku}`} className="tooltip_info" place="top" effect="solid">
							{row.sku}
						</ReactTooltip>
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
		return () => {
			dispatch(productUnavailableResetMessage());
		};
	}, [dispatch, queryString]);

	useEffect(() => {
		if (productUnAvailableExcelMessage !== null) {
			dispatch(productList(queryString));
		}
	}, [productUnAvailableExcelMessage]);

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
		let checkAvailableStatus = selectedData?.map((ele) => ele.avalibity_status);
		if (selectedData?.length == 1 && checkAvailableStatus == 'False') {
			ToastSwal.fire({
				icon: 'warning',
				text: 'This item is already unavailable. Please select the available & memo item',
				customClass: {
					confirmButton: 'btn btn-primary',
				},
				buttonsStyling: false,
			}).then(() => {
				setToggleClearRows(!toggledClearRows);
			});
		} else {
			ToastSwal.fire({
				title: 'Are you sure?',
				text: 'These selected items will be marked as unavailable',
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
		}
	};

	const multiAvailableProduct = (e, selectedData) => {
		let checkAvailableStatus = selectedData?.map((ele) => ele.avalibity_status);
		if (selectedData?.length == 1 && checkAvailableStatus == 'True') {
			ToastSwal.fire({
				icon: 'success',
				text: 'This item is already available. Please select the unavailable & memo item',
				customClass: {
					confirmButton: 'btn btn-primary',
				},
				buttonsStyling: false,
			}).then(() => {
				setToggleClearRows(!toggledClearRows);
			});
		} else {
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
		}
	};

	const multiMemoProduct = (e, selectedData) => {
		let checkAvailableStatus = selectedData?.map((ele) => ele.avalibity_status);
		if (selectedData?.length == 1 && checkAvailableStatus == 'Memo') {
			ToastSwal.fire({
				icon: 'success',
				text: 'This item is already memo. Please select the available & unavailable item',
				customClass: {
					confirmButton: 'btn btn-primary',
				},
				buttonsStyling: false,
			}).then(() => {
				setToggleClearRows(!toggledClearRows);
			});
		} else {
			ToastSwal.fire({
				title: 'Are you sure?',
				text: 'These selected items will be marked as memo',
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
						key: 'memo',
					};
					dispatch(ProductsMultiDeleteRequest(multiAvailableStatus));
					setToggleClearRows(!toggledClearRows);
				}
				setToggleClearRows(!toggledClearRows);
			});
		}
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

		const filename = 'Products.csv';

		if (!csv.match(/^data:text\/csv/i)) {
			csv = `data:text/csv;charset=utf-8,${csv}`;
		}

		link.setAttribute('href', encodeURI(csv));
		link.setAttribute('download', filename);
		link.click();
		toast.success('Products csv successfully downloaded');
	};

	const handleExcelSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append('file', excelFile);
		dispatch(productUnavailableExcelRequest(formData));
		setexcelFile(false);
		e.target.reset();
		setUnavailableExcelModel(!unavailableExcelModel);
		dispatch(productUnavailableResetMessage());
	};

	const handleUnavailableExcelChange = (e) => {
		const files = e.target.files[0];
		setexcelFile(files);
	};

	const dynamicHeight = Math.min(productData?.results?.length * 3 + 1, 70) + 'vh';
	return (
		<Fragment>
			<Modal
				isOpen={unavailableExcelModel}
				toggle={() => setUnavailableExcelModel(!unavailableExcelModel)}
				className="modal-dialog-centered modal-sm"
			>
				<ModalHeader toggle={() => setUnavailableExcelModel(!unavailableExcelModel)}>
					Upload Excel
				</ModalHeader>
				<ModalBody>
					<Form onSubmit={(e) => handleExcelSubmit(e)}>
						<FormGroup>
							<Label for="folder_path">Status Update Excel</Label>
							<Input type="file" onChange={(e) => handleUnavailableExcelChange(e)} />
						</FormGroup>
						{isLoading == true || excelFile == false ? (
							<Button.Ripple className="mr-1" size="sm" color="primary" type="submit" disabled>
								Submit
							</Button.Ripple>
						) : (
							<Button.Ripple className="mr-1" size="sm" color="primary" type="submit">
								Submit
							</Button.Ripple>
						)}
					</Form>
				</ModalBody>
			</Modal>
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

								{selectedData?.length > 0 ? (
									<Button.Ripple
										size="sm"
										data-tip
										data-for="available_products"
										onClick={(e) => multiMemoProduct(e, selectedData)}
										outline
										color="primary"
										value="avalible"
										style={{ cursor: 'pointer' }}
									>
										<Book className="text-secondary" size={20} />
										<ReactTooltip
											id="available_products"
											className="tooltip_info"
											place="top"
											effect="solid"
										>
											Mark as Memo
										</ReactTooltip>
									</Button.Ripple>
								) : (
									<Button.Ripple
										size="sm"
										data-tip
										data-for="memo_products"
										outline
										color="primary"
										value="avalible"
										style={{ cursor: 'pointer' }}
									>
										<Book
											className="text-secondary"
											style={{ cursor: 'pointer', opacity: '0.6' }}
											size={20}
										/>
										<ReactTooltip
											id="memo_products"
											className="tooltip_info"
											place="top"
											effect="solid"
										>
											Mark as Memo
										</ReactTooltip>
									</Button.Ripple>
								)}
							</ButtonGroup>
						</Col>

						<Col xl="8" className="d-flex align-items-sm-center justify-content-lg-end my-1 px-0">
							<Col xl="6">
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
									<Button.Ripple
										color="primary"
										style={{ padding: '10px' }}
										outline
										size="sm"
										onClick={() => setUnavailableExcelModel(true)}
									>
										<FileText size={14} />
										<span className="align-middle ml-25">Status Update Excel</span>
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
