// ** React Imports
import { Fragment, useState, useEffect } from 'react';
// ** Columns
import { columns } from './columns';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
// ** Third Party Components
import { ChevronDown, X } from 'react-feather';
import DataTable from 'react-data-table-component';
import {
	Card,
	Row,
	Col,
	Button,
	CardBody,
	Badge
} from 'reactstrap';
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { sendFeed } from '../../../../redux/productsSlice';
import { datatable_per_page, datatable_per_raw } from '../../../../configs/constant_array';
import { selectThemeColors } from '@utils';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// import toast from 'react-hot-toast';
import { toast } from 'react-toastify';
import Avatar from '@components/avatar';
import { FtpFeedRecordList, FtpGetDataDrowpDown } from '../../../../redux/FtpsSlice';

const OpenSwal = withReactContent(Swal);

const ErrorToast = () => (
	<Fragment>
		<div className="toastify-header">
			<div className="title-wrapper">
				<Avatar size="sm" color="danger" icon={<X size={12} />} />
			</div>
			<span className="toast-title" style={{ fontWeight: '200' }}>
				Please select client for FTP Feed &amp; color,shape or cut
			</span>
		</div>
	</Fragment>
);

const ErrorToastFilter = () => (
	<Fragment>
		<div className="toastify-header">
			<div className="title-wrapper">
				<Avatar size="sm" color="danger" icon={<X size={12} />} />
			</div>
			<span className="toast-title" style={{ fontWeight: '200' }}>
				Color Or Shape Or cut value is empty please Select the value that is in your feed data
			</span>
		</div>
	</Fragment>
);


const AddProductToastMessage = () => (
	<Fragment>
		<div className="toastify-header">
			<div className="title-wrapper">
				<Avatar size="sm" color="success" icon={<X size={12} />} />
			</div>
			<span className="toast-title" style={{ fontWeight: '200' }}>
				Product has been added to the table please check below to see
			</span>
		</div>
	</Fragment>
)

const FtpFeedList = () => {
	// ** Store Vars
	const dispatch = useDispatch();
	const { ftpGetAllData, ftpFeedData } = useSelector((state) => state.Ftps);


	// const { productData } = useSelector((state) => state.products);

	const getAllDropdownValue = ftpGetAllData.ftp_data?.map((item) => item);

	const colorDropDownValue = ftpGetAllData.product_color?.map((item) => item);

	const cutDropDownValue = ftpGetAllData.product_cut?.map((item) => item);

	const shapeDropDownValue = ftpGetAllData.product_shape?.map((item) => item);

	const [limit, setPerPage] = useState(datatable_per_page);

	const [sort_order, setSort_order] = useState('desc');
	const [toggledClearRows, setToggleClearRows] = useState(false);
	const [filterColor, setFilterColor] = useState([]);
	const [filterShape, setFilterShape] = useState([]);
	const [filterCut, setFilterCut] = useState([]);
	const [selectedRow, setSelectedRow] = useState();
	const [showTableArray, setShowTableArray] = useState()
	const [colorLabelArray, setColorLabelArray] = useState([]);
	const [shapLabelArray, setShapeLabelArray] = useState([]);
	const [cutLabelArray, setCutLabelArray] = useState([]);
	const [selectedData, setSelectedData] = useState();

	const [ftpvalue, setFtpValue] = useState();

	const [showTable, setShowTable] = useState(false);

	const table_data = {
		page: 1,
		per_page: limit,
		sort_order: sort_order,
		color__in: filterColor == undefined ? '' : colorLabelArray,
		shape__in: filterShape == undefined ? '' : shapLabelArray,
		cut__in: filterCut == undefined ? '' : cutLabelArray,
		order_column: 'created_at',
	};

	const [queryString, setQueryString] = useState(
		`page=${table_data.page}&color__in=${table_data.color__in}&shape__in=${table_data.shape__in}&cut__in=${table_data.cut__in}&per_page=${table_data.per_page}&order_column=${table_data.order_column}`
	);

	useEffect(() => {
		dispatch(FtpGetDataDrowpDown());
	}, []);

	useEffect(() => {
		dispatch(FtpFeedRecordList(queryString));
	}, [dispatch, queryString]);

	useEffect(() => {
		if (ftpFeedData?.results) {
			setSelectedData(ftpFeedData?.results);
		}
	}, [ftpFeedData]);

	// useEffect(() => {
	// 	if (selectedRow) {
	// 		// setShowTable(false);
	// 		setSelectedRow(selectedRow)
	// 	}
	// }, [selectedRow?.length]);



	// useEffect(() => {
	// 	dispatch(FtpGetDataDrowpDown());
	// 	dispatch(productList(queryString));
	// 	if (ftpFeedData?.results) {
	// 		setSelectedData(ftpFeedData?.results);
	// 	}
	// }, [dispatch, queryString,ftpFeedData]);

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
	};

	const handleChange = (e) => {
		setFtpValue(e);
	};

	const openPopup = () => {
		OpenSwal.fire({
			title: 'Are you sure?',
			text: `You want to feed these ${showTableArray?.length > 0 ? showTableArray?.length : ftpFeedData?.count} product in FTP feed.`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Send Feed',
			customClass: {
				confirmButton: 'btn btn-primary',
				cancelButton: 'btn btn-outline-danger ml-1',
			},
			buttonsStyling: false,
		}).then((res) => {
			if (res && res.isConfirmed) {
				let ftpValues = ftpvalue?.map((ele) => ele.value);
				let selectSku = selectedRow?.map((ele) => ele.sku)
				if (selectSku?.length > 0) {
					let selectSkuObj = {
						ftp: ftpValues,
						sku_list: selectSku,
					};
					setFtpValue([]);
					dispatch(sendFeed(selectSkuObj));
					setShowTableArray(0)
					setToggleClearRows(!toggledClearRows);
					setShowTable(false)
				} else {
					let ftpValuePass = {
						ftp: ftpValues,
						sku_list: [],
					};
					setFtpValue([]);
					dispatch(sendFeed(ftpValuePass));
					setShowTable(false)
				}
				setFtpValue([]);

			}
		});
	};

	const handleColor = (e, shapLabelArray, cutLabelArray) => {
		var getColorLabel = [];
		for (let index = 0; index < e.length; index++) {
			const element = e[index].label;
			getColorLabel.push(element);
		}

		tableChangeHandler({
			...table_data,
			color__in: filterColor == [] ? '' : getColorLabel.join(','),
			shape__in: shapLabelArray,
			cut__in: cutLabelArray,
		});

		setColorLabelArray(getColorLabel.join(','));
		setFilterColor(e);
	};

	const handleShape = (e, colorLabelArray, cutLabelArray) => {
		var getShapLabel = [];
		for (let index = 0; index < e.length; index++) {
			const element = e[index].label;
			getShapLabel.push(element);
		}

		tableChangeHandler({
			...table_data,
			color__in: colorLabelArray,
			shape__in: filterShape == [] ? '' : getShapLabel.join(','),
			cut__in: cutLabelArray,
		});

		setShapeLabelArray(getShapLabel.join(''));
		setFilterShape(e);
	};

	const handleCut = (e, colorLabelArray, shapLabelArray) => {
		let getCutLabel = [];

		for (let index = 0; index < e.length; index++) {
			const element = e[index].label;
			getCutLabel.push(element);
		}
		tableChangeHandler({
			...table_data,
			color__in: colorLabelArray,
			shape__in: shapLabelArray,
			cut__in: filterCut == [] ? '' : getCutLabel.join(','),
		});
		setCutLabelArray(getCutLabel.join(','));
		setFilterCut(e);
	};

	const selectRows = (state) => {
		setSelectedRow(state.selectedRows);
	};

	const sendFeedClick = () => {
		toast.error(<ErrorToast />, {
			// transition: Slide,
			hideProgressBar: true,
			autoClose: 2000,
		});
	};

	const sendFilter = () => {
		toast.error(<ErrorToastFilter />, {
			// transition: Slide,
			hideProgressBar: true,
			autoClose: 2000,
		});
	};

	// const conditionalRowStyles = [
	// 	{
	// 		when: (row) => row.toggleSelected,
	// 		style: {
	// 			backgroundColor: 'green',
	// 			userSelect: 'none',
	// 			minHeight: '22px',
	// 			cursor: 'pointer',
	// 		},
	// 	},
	// ];

	// const handleRowClicked = (row) => {
	// 	const updatedData = selectedData?.map((item) => {
	// 		if (row.id !== item.id) {
	// 			return item;
	// 		}

	// 		if (!item.toggleSelected == true) {
	// 			let getRecord = array?.find((ele) => ele.id === item.id);
	// 			if (!getRecord) {
	// 				setArray((oldArray) => [...oldArray, item]);
	// 			}
	// 		} else {
	// 			let getRecord = array?.find((ele) => ele.id === item.id);
	// 			setShowTable(false);
	// 			const index = array.indexOf(getRecord);
	// 			if (index > -1) {
	// 				array.splice(index, 1);
	// 			}
	// 		}
	// 		return {
	// 			...item,
	// 			toggleSelected: !item.toggleSelected,
	// 		};
	// 	});

	// 	setSelectedData(updatedData);
	// 	showTable && Addtolist();
	// };
	const Addtolist = () => {
		if (selectedRow?.length >= 1) {
			setShowTable(true);
			setShowTableArray(selectedRow)
			toast.success(<AddProductToastMessage />, {
				hideProgressBar: true,
				autoClose: 2000,
			})

		} else {
			setShowTable(false);
		}
	};
	const dynamicHeight = Math.min(window.innerHeight * 4 + 1, 70) + 'vh';
	return (
		<Fragment>
			<Card className="deskboard_card">
				<CardBody className="deskboard_card_body">
					{/* <Form onSubmit={(e) => filterSubmit(e)}> */}
					<Row>
						<Col lg="3" md="6">
							<Select
								size="sm"
								isClearable={false}
								theme={selectThemeColors}
								placeholder="Select Client for FTP Feed"
								isMulti
								name="ftp"
								className="react-select feed_select"
								classNamePrefix="select"
								options={getAllDropdownValue}
								value={ftpvalue}
								onChange={(e) => handleChange(e)}
							/>
						</Col>
						<Col lg="3" md="6">
							{/* {/ <Label for="color">Color:</Label> /} */}
							<Select
								size="sm"
								isClearable={false}
								theme={selectThemeColors}
								placeholder="Select Color"
								className="react-select feed_select"
								name="color"
								isMulti
								classNamePrefix="select"
								options={colorDropDownValue}
								value={filterColor}
								onChange={(e) => handleColor(e, shapLabelArray, cutLabelArray)}
							/>
						</Col>
						<Col lg="3" md="6">
							<Select
								size="sm"
								isClearable={false}
								theme={selectThemeColors}
								placeholder="Select Shape"
								name="shape"
								className="react-select feed_select"
								isMulti
								classNamePrefix="select"
								options={shapeDropDownValue}
								value={filterShape}
								onChange={(e) => handleShape(e, colorLabelArray, cutLabelArray)}
							/>
						</Col>
						<Col lg="3" md="6">
							<Select
								size="sm"
								isClearable={false}
								theme={selectThemeColors}
								placeholder="Select Cut"
								name="cut"
								className="react-select feed_select"
								isMulti
								classNamePrefix="select"
								options={cutDropDownValue}
								value={filterCut}
								onChange={(e) => handleCut(e, colorLabelArray, shapLabelArray)}
							/>
						</Col>

						{/* <Col lg="1" md="3">
								
								<Button.Ripple
									type="submit"
									size="sm"
									color="relief-primary"
									className="filter_button"
									block
								>
									Filter
								</Button.Ripple>
							</Col> */}
					</Row>

					<Row>
						<Col xl="4 mt-2">
							{selectedRow?.length > 0 ? (
								<Button.Ripple
									size="sm"
									onClick={() => Addtolist()}
									className="btn-success"
									style={{ cursor: 'pointer' }}
								>
									Add to list
								</Button.Ripple>
							) : null}
						</Col>
					</Row>
				</CardBody>
				<DataTable
					noHeader
					pagination
					// subHeader
					selectableRows={colorLabelArray?.length > 0 || shapLabelArray?.length > 0 || cutLabelArray?.length > 0 ? true : false}
					clearSelectedRows={toggledClearRows}
					onSelectedRowsChange={selectRows}
					responsive
					paginationServer
					columns={columns}
					// data={ftpFeedData?.results}
					data={selectedData}
					// onRowClicked={handleRowClicked}
					paginationTotalRows={ftpFeedData?.count}
					paginationRowsPerPageOptions={datatable_per_raw}
					onChangeRowsPerPage={handlePerRowsChange}
					onChangePage={handlePageChange}
					// conditionalRowStyles={conditionalRowStyles}
					sortIcon={<ChevronDown />}
					className={`react-dataTable ${selectedRow?.length > 0 ? "table_height iazphd" : ""}`}
					fixedHeader
					fixedHeaderScrollHeight={dynamicHeight}
					paginationPerPage={table_data.per_page}
				/>
			</Card>
			<Row>

				<Col lg="1" md="3" className="pl-1 mt-1">
					{/* <Label for="send feed"></Label> */}
					{ftpvalue && ftpvalue?.length > 0 && ftpFeedData?.results?.length > 0 ? (
						<Button.Ripple
							type="submit"
							size="sm"
							color="relief-danger"
							onClick={openPopup}
							className="seed_button"
							block
						>
							Send Feed
						</Button.Ripple>
					) : (
						<Button.Ripple
							type="submit"
							size="sm"
							color="relief-danger"
							onClick={ftpFeedData?.results?.length == 0 ? () => sendFilter() : () => sendFeedClick()}
							style={{ opacity: '0.6' }}
							className="seed_button"
							block
						>
							Send Feed
						</Button.Ripple>
					)}
				</Col>
				<Col mb="3" className="pl-0" style={{ marginTop: "15px" }}>
					{
						showTableArray?.length > 0 ? (<Badge color="primary" style={{ padding: "8px 12px" }}>Total Products: {showTableArray?.length > 0 ? showTableArray?.length : ftpFeedData?.count}</Badge>) : null
					}

				</Col>
			</Row>
			{showTable && (
				<div className="mt-1">
					{/* <Card className="deskboard_card"> */}
					<DataTable
						noHeader
						responsive
						columns={columns}
						// data={selectedRow?.length > 0 ? selectedRow : array}
						data={showTableArray}
						className="react-dataTable"
						fixedHeader
						fixedHeaderScrollHeight={dynamicHeight}
					/>
					{/* </Card> */}
				</div>
			)}
		</Fragment>
	);
};

export default FtpFeedList;
