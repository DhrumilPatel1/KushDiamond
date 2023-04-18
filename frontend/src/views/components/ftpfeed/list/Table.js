// ** React Imports
import { Fragment, useState, useEffect } from 'react';
// ** Columns
import { columns } from './columns';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
// ** Third Party Components
import { ChevronDown, RotateCcw, Send, Trash2, X, XCircle } from 'react-feather';
import DataTable from 'react-data-table-component';
import {
	Card,
	Row,
	Col,
	Button,
	CardBody,
	Badge,
	Input,
	CardHeader,
	CardTitle,
	ButtonGroup,
} from 'reactstrap';
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { FeedData, sendFeed } from '../../../../redux/productsSlice';
import { datatable_per_page, datatable_per_raw } from '../../../../configs/constant_array';
import { selectThemeColors } from '@utils';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// import toast from 'react-hot-toast';
import { toast } from 'react-toastify';
import Avatar from '@components/avatar';
import {
	FtpFeedRecordList,
	ftpFeedResestData,
	ftpfeedTotalCountRecordList,
	FtpGetDataDrowpDown,
} from '../../../../redux/FtpsSlice';

const OpenSwal = withReactContent(Swal);

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
);

const FtpFeedList = () => {
	// ** Store Vars
	const dispatch = useDispatch();
	const { ftpGetAllData, ftpFeedData, ftpfeedTotalCountData, isLoading } = useSelector(
		(state) => state.Ftps
	);

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
	const [showTableArray, setShowTableArray] = useState();
	const [colorLabelArray, setColorLabelArray] = useState([]);
	const [shapLabelArray, setShapeLabelArray] = useState([]);
	const [cutLabelArray, setCutLabelArray] = useState([]);
	const [filterRecord, setFilterRecord] = useState([]);
	const [extendData, setExtendData] = useState([]);
	const [ftpvalue, setFtpValue] = useState();
	const [showTable, setShowTable] = useState(false);
	const [total, setTotal] = useState(false);
	const [tableWidth, setTableWidth] = useState(false);
	const [showTableWidth, setShowTableWidth] = useState(false);
	const [rowArray, setRowArray] = useState([]);

	const ErrorToast = () => (
		<Fragment>
			<div className="toastify-header">
				<div className="title-wrapper">
					<Avatar size="sm" color="danger" icon={<X size={12} />} />
				</div>
				<span className="toast-title" style={{ fontWeight: '200' }}>
					{ftpvalue?.length > 0
						? 'Please click Add all or Add Selected'
						: 'Please select client for FTP Feed color,shape or cut'}
				</span>
			</div>
		</Fragment>
	);

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

	// useEffect(() => {
	// 	dispatch(FtpGetDataDrowpDown());
	// }, []);

	useEffect(() => {
		dispatch(FtpGetDataDrowpDown());
		dispatch(FtpFeedRecordList(queryString));
		if (ftpfeedTotalCountData?.count > 0) {
			setFilterRecord(ftpfeedTotalCountData?.results);
			setExtendData(ftpfeedTotalCountData?.results);
			// setRowArray(0);
		}
		if (showTableArray?.length > 0) {
			setFilterRecord(showTableArray);
			setExtendData(showTableArray);
			setRowArray([]);
		}
	}, [dispatch, queryString, ftpfeedTotalCountData, showTableArray]);

	// useEffect(() => {
	// 	if (ftpFeedData?.results) {
	// 		setSelectedData(ftpFeedData?.results);
	// 	}
	// }, [ftpFeedData]);

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

	const handleChange = (e) => {
		setFtpValue(e);
	};

	const openPopup = () => {
		OpenSwal.fire({
			title: 'Are you sure?',
			text: `You want to feed these ${
				// showTableArray?.length > 0 ? showTableArray?.length : ftpFeedData?.count
				filterRecord?.length
			} product in FTP feed.`,
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
				// let selectSku = selectedRow?.map((ele) => ele.sku);
				// let totalSku = ftpfeedTotalCountData?.results?.map((ele) => ele.sku);
				let totalfilterRecordSku = filterRecord?.map((ele) => ele.sku);
				if (totalfilterRecordSku?.length > 0) {
					let selectSkuObj = {
						ftp: ftpValues,
						sku_list: totalfilterRecordSku,
					};
					// console.log({ selectSkuObj });
					setFtpValue([]);
					dispatch(sendFeed(selectSkuObj));
					setFilterRecord(0);
					setToggleClearRows(!toggledClearRows);
					setShowTable(false);
				}
				// if (selectSku?.length > 0) {
				// 	let selectSkuObj = {
				// 		ftp: ftpValues,
				// 		sku_list: selectSku,
				// 	};
				// 	setFtpValue([]);
				// 	dispatch(sendFeed(selectSkuObj));
				// 	setShowTableArray(0);
				// 	setToggleClearRows(!toggledClearRows);
				// 	setShowTable(false);
				// } else if (totalSku?.length > 0) {
				// 	let ftpValuePass = {
				// 		ftp: ftpValues,
				// 		sku_list: totalSku,
				// 	};
				// 	setFtpValue([]);
				// 	setTotal(false);
				// 	dispatch(sendFeed(ftpValuePass));
				// 	setShowTable(false);
				// } else {
				// 	let ftpObj = {
				// 		ftp: ftpValues,
				// 		sku_list: [],
				// 	};
				// 	setFtpValue([]);
				// 	dispatch(sendFeed(ftpObj));
				// 	setShowTable(false);
				// }
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
		// dispatch(ftpFeedResestData());
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

	const conditionalRowStyles = [
		{
			when: (row) => row.toggleSelected,
			style: {
				backgroundColor: '#facea8',
				userSelect: 'none',
				minHeight: '22px',
				cursor: 'pointer',
			},
		},
	];

	const handleRowClicked = (row) => {
		const updatedData = filterRecord?.map((item) => {
			if (row.id !== item.id) {
				return item;
			} else if (!item.toggleSelected == true) {
				// if (rowArray == 0) {
				// 	setRowArray(rowArray);
				// } else {
				// 	let getRecord = rowArray?.find((ele) => ele.id === item.id);
				// 	if (!getRecord) {
				// 		setRowArray((oldArray) => [...oldArray, item]);
				// 	}
				// }

				setRowArray((oldArray) => [...oldArray, item]);

				// let getRecord = rowArray?.find((ele) => ele.id === item.id);
				// console.log({getRecord})
				// if (!getRecord) {
				// 	setRowArray((oldArray) => [...oldArray, item]);
				// }
			} else {
				let getRecord = rowArray?.find((ele) => ele.id === item.id);
				const index = rowArray.indexOf(getRecord);
				if (index > -1) {
					rowArray.splice(index, 1);
				}
			}
			return {
				...item,
				toggleSelected: !item.toggleSelected,
			};
		});

		setFilterRecord(updatedData);
		// showTable && Addtolist();
	};
	const Addtolist = () => {
		if (selectedRow?.length >= 1) {
			setShowTable(true);
			setShowTableArray(selectedRow);
			setFilterRecord(selectedRow);
			setExtendData(selectedRow);
			// setFilterRecord((oldArray) => [...oldArray, selectedRow])
			setRowArray([]);
			toast.success(<AddProductToastMessage />, {
				hideProgressBar: true,
				autoClose: 2000,
			});
		} else {
			setShowTable(false);
		}
	};

	const addAll = () => {
		setShowTable(true);
		setTotal(true);
		dispatch(
			ftpfeedTotalCountRecordList(
				`color__in=${table_data.color__in}&shape__in=${table_data.shape__in}&cut__in=${table_data.cut__in}&per_page=${ftpFeedData?.count}&order_column=${table_data.order_column}`
			)
		);
		setFilterRecord(ftpfeedTotalCountData?.results);
		setExtendData(ftpfeedTotalCountData?.results);
		toast.success(<AddProductToastMessage />, {
			hideProgressBar: true,
			autoClose: 2000,
		});
	};

	const multiRowDelete = () => {
		OpenSwal.fire({
			title: 'Are you sure?',
			text: 'Do you want to remove?',
			showCancelButton: true,
			confirmButtonText: 'Yes',
			customClass: {
				confirmButton: 'btn btn-primary',
				cancelButton: 'btn btn-outline-danger ml-1',
			},
			buttonsStyling: false,
		}).then((res) => {
			if (res && res.isConfirmed) {
				const deleteRow = filterRecord.filter(
					({ id: ele }) => !rowArray.some(({ id: item }) => item === ele)
				);

				setFilterRecord(deleteRow);
				setExtendData(deleteRow);
				setRowArray([]);
				setToggleClearRows(!toggledClearRows);
			}
		});
	};

	const resetAll = () => {
		setFilterRecord(0);
		dispatch(ftpFeedResestData());
		setShowTableWidth(false);
		setShowTable(false);
		setTotal(false);
		setShowTableArray(0);
		setToggleClearRows(!toggledClearRows);
		setRowArray([]);
	};

	const handleFilter = (e) => {
		const getFilterFtpFeedRecord =
			e.target.value == '' || e.target.value == null
				? extendData
				: filterRecord &&
				  filterRecord.filter((ele) => ele.sku.toLowerCase().match(e.target.value.toLowerCase()));

		setFilterRecord(getFilterFtpFeedRecord);
	};

	const dynamicHeight = Math.min(window.innerHeight * 4 + 1, 70) + 'vh';
	return (
		<Fragment>
			<Card className="deskboard_card">
				<CardHeader className="d-block border-bottom py-1">
					<CardTitle tag="h4">FTP Feed Products Filter</CardTitle>
					<div className="mt-1">
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
						</Row>
					</div>
				</CardHeader>
				<CardBody className="deskboard_card_body">
					<Row>
						<Col md="4 mt-1 px-0">
							{selectedRow?.length > 0 ? (
								<Button.Ripple
									size="sm"
									onClick={() => Addtolist()}
									className="btn-success seed_button ml-2"
									style={{ cursor: 'pointer' }}
								>
									Add Selected
								</Button.Ripple>
							) : null}

							{selectedRow?.length > 0 || ftpFeedData?.count == 0 ? null : (
								<Button.Ripple
									size="sm"
									onClick={addAll}
									className="btn-secondary seed_button ml-2"
									style={{ cursor: 'pointer' }}
								>
									Add All
								</Button.Ripple>
							)}
							{tableWidth == true ? (
								<Button.Ripple
									size="sm"
									onClick={() => setTableWidth(false)}
									className="seed_button ml-2"
									color="primary"
									style={{ cursor: 'pointer' }}
								>
									100% Height
								</Button.Ripple>
							) : (
								<Button.Ripple
									size="sm"
									onClick={() => setTableWidth(true)}
									className="seed_button ml-2"
									color="primary"
									style={{ cursor: 'pointer' }}
								>
									50% Height
								</Button.Ripple>
							)}
						</Col>
					</Row>
				</CardBody>
				<DataTable
					noHeader
					pagination
					// subHeader
					selectableRows={
						colorLabelArray?.length > 0 || shapLabelArray?.length > 0 || cutLabelArray?.length > 0
							? true
							: false
					}
					clearSelectedRows={toggledClearRows}
					onSelectedRowsChange={selectRows}
					responsive
					paginationServer
					columns={columns}
					data={ftpFeedData?.results}
					// data={selectedData}
					// onRowClicked={handleRowClicked}
					paginationTotalRows={ftpFeedData?.count}
					paginationRowsPerPageOptions={datatable_per_raw}
					onChangeRowsPerPage={handlePerRowsChange}
					onChangePage={handlePageChange}
					// conditionalRowStyles={conditionalRowStyles}
					sortIcon={<ChevronDown />}
					className={`react-dataTable datatalbe_bg_color ${
						tableWidth == true ? 'table_height iazphd' : ''
					}`}
					fixedHeader
					fixedHeaderScrollHeight={dynamicHeight}
					paginationPerPage={table_data.per_page}
				/>
			</Card>
			<div className="mt-2">
				<Card className="deskboard_card">
					<CardHeader className="border-bottom py-1">
						<CardTitle tag="h4" style={{ fontSize: '20px' }}>
							Product Bucket for FTP Feed
						</CardTitle>
					</CardHeader>
					<CardBody className="deskboard_card_body">
						<Row className="mt-1">
							<Col lg="5" className="d-flex align-items-sm-center">
								<Badge color="primary" className="seed_button" style={{ padding: '8px 12px' }}>
									Total Products: {showTable == true ? filterRecord?.length : 0}
								</Badge>

								{showTableWidth == true ? (
									<Button.Ripple
										size="sm"
										onClick={() => setShowTableWidth(false)}
										className="btn-primary seed_button ml-2"
										outline
										color="primary"
										style={{ cursor: 'pointer' }}
									>
										100% Height
									</Button.Ripple>
								) : (
									<Button.Ripple
										size="sm"
										onClick={() => setShowTableWidth(true)}
										className="btn-primary seed_button ml-2"
										outline
										color="primary"
										style={{ cursor: 'pointer' }}
									>
										50% Height
									</Button.Ripple>
								)}
							</Col>

							<Col xl="4">
								<ButtonGroup>
									{ftpvalue &&
									ftpvalue?.length > 0 &&
									filterRecord?.length > 0 &&
									showTable == true ? (
										<Button.Ripple
											type="submit"
											size="sm"
											outline
											color="primary"
											onClick={openPopup}
											className="seed_button"
										>
											<Send className="text-success" style={{ marginRight: '8px' }} size={20} />
											Send Feed
										</Button.Ripple>
									) : (
										<Button.Ripple
											type="submit"
											size="sm"
											outline
											color="primary"
											onClick={
												ftpFeedData?.results?.length == 0
													? () => sendFilter()
													: () => sendFeedClick()
											}
											style={{ opacity: '0.6' }}
											className="seed_button"
										>
											<Send className="text-success" style={{ marginRight: '8px' }} size={20} />
											Send Feed
										</Button.Ripple>
									)}
									{rowArray?.length > 0 ? (
										<Button.Ripple
											type="submit"
											size="sm"
											outline
											color="primary"
											onClick={multiRowDelete}
											className="seed_button"
										>
											<Trash2 className="text-danger" style={{ marginRight: '8px' }} size={20} />
											Remove
										</Button.Ripple>
									) : (
										<Button.Ripple
											type="submit"
											size="sm"
											outline
											color="primary"
											style={{ opacity: '0.6' }}
											className="seed_button"
										>
											<Trash2 className="text-danger" style={{ marginRight: '8px' }} size={20} />
											Remove
										</Button.Ripple>
									)}

									{showTable == true ? (
										<Button.Ripple
											size="sm"
											outline
											color="primary"
											onClick={resetAll}
											className="seed_button"
											style={{ cursor: 'pointer' }}
										>
											<RotateCcw size={20} style={{ marginRight: '8px' }} />
											Reset
										</Button.Ripple>
									) : (
										<Button.Ripple
											size="sm"
											outline
											color="primary"
											className="seed_button"
											style={{ cursor: 'pointer', opacity: '0.6' }}
										>
											<RotateCcw size={20} style={{ marginRight: '8px' }} />
											Reset
										</Button.Ripple>
									)}
								</ButtonGroup>
							</Col>
							<Col xl="3">
								{showTable == true ? (
									<Input
										id="search"
										className="w-80 form-control-sm"
										type="text"
										size="sm"
										name="search"
										onChange={handleFilter}
										placeholder="Search (Enter your SKU)"
									/>
								) : (
									<Input
										id="search"
										className="w-80 form-control-sm"
										type="text"
										size="sm"
										placeholder="Search (Enter your SKU)"
									/>
								)}
							</Col>
						</Row>
					</CardBody>
				</Card>
			</div>

			{/* {showTable && ( */}
			<div className="mt-1">
				{/* <Card className="deskboard_card"> */}
				<DataTable
					noHeader
					pagination
					responsive
					columns={columns}
					data={
						// showTableArray?.length > 0
						// 	? showTableArray
						// 	: filterRecord?.length > 0
						// 	? filterRecord
						// 	: ftpfeedTotalCountData?.results?.length > 0
						// 	? ftpfeedTotalCountData?.results
						// 	: []
						showTable && filterRecord?.length > 0 ? filterRecord : []
					}
					onRowClicked={handleRowClicked}
					className={`react-dataTable show_datatable ${
						showTableWidth == true ? 'table_height iazphd' : ''
					}`}
					conditionalRowStyles={conditionalRowStyles}
					paginationRowsPerPageOptions={[10, 25, 50, 100, 500]}
					paginationPerPage={50}
					progressPending={isLoading}
					fixedHeader
					fixedHeaderScrollHeight={dynamicHeight}
				/>
				{/* </Card> */}
			</div>
			{/* )} */}
		</Fragment>
	);
};

export default FtpFeedList;
