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
import { sendFeed } from '../../../../redux/productsSlice';
import { datatable_per_page, datatable_per_raw } from '../../../../configs/constant_array';
import { selectThemeColors } from '@utils';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// import toast from 'react-hot-toast';
import { toast, Slide } from 'react-toastify';
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

const FtpFeedList = () => {
	// ** Store Vars
	const dispatch = useDispatch();
	const { ftpGetAllData, ftpFeedData } = useSelector((state) => state.Ftps);

	const getAllDropdownValue = ftpGetAllData.ftp_data?.map((item) => item);
	const colorDropDownValue = ftpGetAllData.product_color?.map((item) => item);
	const cutDropDownValue = ftpGetAllData.product_cut?.map((item) => item);

	const shapeDropDownValue = ftpGetAllData.product_shape?.map((item) => item);

	const [limit, setPerPage] = useState(datatable_per_page);

	const [sort_order, setSort_order] = useState('desc');
	const [filterColor, setFilterColor] = useState('');

	const [filterShape, setFilterShape] = useState('');
	const [filterCut, setFilterCut] = useState('');
	const [ftpvalue, setFtpValue] = useState([]);

	const table_data = {
		page: 1,
		per_page: limit,
		sort_order: sort_order,
		color: filterColor.label == undefined ? '' : filterColor.label,
		shape: filterShape.label == undefined ? '' : filterShape.label,
		cut: filterCut.label == undefined ? '' : filterCut.label,
		order_column: 'created_at',
	};

	const [queryString, setQueryString] = useState(
		`page=${table_data.page}&color=${table_data.color}&shape=${table_data.shape}&cut=${table_data.cut}&per_page=${table_data.per_page}&order_column=${table_data.order_column}`
	);

	const ftpParams = {
		fTPSting: `color=${filterColor.label == undefined ? '' : filterColor.label}&shape=${
			filterShape.label == undefined ? '' : filterShape.label
		}&cut=${filterCut.label == undefined ? '' : filterCut.label}`,
	};

	useEffect(() => {
		dispatch(FtpGetDataDrowpDown());
		dispatch(FtpFeedRecordList(queryString));
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
		// console.log(filterColor,"e.target.color.value")
		// setFilterColor(e.target.color.value);
		// setFilterShape(e.target.shape.value);
		// setFilterCut(e.target.cut.value);
		// tableChangeHandler({
		// 	...table_data,
		// 	color: e.target.color.value,
		// 	shape: e.target.shape.value,
		// 	cut: e.target.cut.value,
		// });
	};

	const handleChange = (e) => {
		setFtpValue(e);
	};

	const openPopup = () => {
		OpenSwal.fire({
			title: 'Are you sure?',
			text: `You want to feed these ${ftpFeedData?.count} product in FTP feed.`,
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
				let ftpValues = ftpvalue.map((ele) => ele.value);
				let ftpValuePass = {
					ftp: ftpValues,
				};

				setFtpValue([]);
				dispatch(sendFeed(ftpValuePass, ftpParams.fTPSting));
			}
		});
	};

	const handleShape = (e, color, filterCut) => {
		tableChangeHandler({
			...table_data,
			color: color.label != undefined && color.label != 'Reset' ? color.label : table_data.color,
			shape: e.label == 'Reset' ? '' : e.label,
			cut:
				filterCut.label != undefined && filterCut.label != 'Reset'
					? filterCut.label
					: table_data.cut,
		});
		setFilterShape(e.label == 'Reset' ? 'Select Shape' : e);
	};

	const handleCut = (e, color, filterShape) => {
		tableChangeHandler({
			...table_data,
			color: color.label != undefined && color.label != 'Reset' ? color.label : table_data.color,
			shape:
				filterShape.label != undefined && filterShape.label != 'Reset'
					? filterShape.label
					: table_data.shape,
			cut: e.label == 'Reset' ? '' : e.label,
		});
		setFilterCut(e.label == 'Reset' ? 'Select Cut' : e);
	};
	const handleColor = (e, filterCuts, filterShapes) => {
		tableChangeHandler({
			...table_data,
			color: e.label == 'Reset' ? '' : e.label,
			shape:
				filterShapes.lable != undefined && filterShapes.label != 'Reset'
					? filterShapes.lable
					: table_data.shape,
			cut:
				filterCuts.label != undefined && filterCuts.label != 'Reset'
					? filterCuts.label
					: table_data.cut,
		});
		setFilterColor(e.label == 'Reset' ? 'Select Color' : e);
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

	const dynamicHeight = Math.min(window.innerHeight * 4 + 1, 70) + 'vh';
	return (
		<Fragment>
			{/* <Card> */}
			{/* <CardHeader>
					<CardTitle tag="h4">Search Filter</CardTitle>
				</CardHeader> */}
			{/* <CardBody>
					<Form onSubmit={(e) => filterSubmit(e)}>
						<Row>
							<Col lg="3" md="6">
								<Label for="color">FTP:</Label>
								<Select
									isClearable={false}
									theme={selectThemeColors}
									placeholder="Select FTP"
									isMulti
									name="ftp"
									className="react-select"
									classNamePrefix="select"
									options={getAllDropdownValue}
									value={ftpvalue}
									onChange={(e) => handleChange(e)}
								/>
							</Col>
							<Col lg="2" md="6">
								<Label for="color">Color:</Label>
								<Input id="color" name="color" placeholder="Enter Color" />
							</Col>
							<Col lg="2" md="6">
								<Label for="shape">Shape:</Label>
								<Input type="text" id="shape" name="shape" placeholder="Enter Shape" />
							</Col>
							<Col lg="2" md="6">
								<Label for="cut">Cut:</Label>
								<Input type="text" name="cut" placeholder="Enter Cut" />
							</Col>
							<Col lg="3" md="3">
								<Label for="cut"></Label>
								<Button.Ripple type="submit" color="relief-primary" block>
									Filter
								</Button.Ripple>
							</Col>
							<Col lg="2" md="3">
								<Label for="send feed"></Label>
								{ftpvalue && ftpvalue.length > 0 ? (
									<Button.Ripple type="submit" color="relief-danger" onClick={openPopup} block>
										Send Feed
									</Button.Ripple>
								) : (
									<Button.Ripple type="submit" color="relief-danger" disabled={true} block>
										Send Feed
									</Button.Ripple>
								)}
							</Col>
						</Row>
					</Form>
				</CardBody> */}
			{/* </Card> */}
			<Card className="deskboard_card">
				<CardBody className="deskboard_card_body">
					<Form onSubmit={(e) => filterSubmit(e)}>
						<Row>
							<Col lg="5" md="6">
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
							<Col lg="2" md="6">
								{/* <Label for="color">Color:</Label> */}
								<Select
									size="sm"
									isClearable={false}
									theme={selectThemeColors}
									placeholder="Select Color"
									className="react-select feed_select"
									name="color"
									classNamePrefix="select"
									options={colorDropDownValue}
									value={filterColor}
									onChange={(e) => handleColor(e, filterCut, filterShape)}
								/>

								{/* <Input
									id="color"
									name="color"
									onChange={(e) => handleColor(e)}
									size="sm"
									placeholder="Enter Color"
								/> */}
							</Col>
							<Col lg="2" md="6">
								{/* <Label for="shape">Shape:</Label> */}
								<Select
									size="sm"
									isClearable={false}
									theme={selectThemeColors}
									placeholder="Select Shape"
									name="shape"
									className="react-select feed_select"
									classNamePrefix="select"
									options={shapeDropDownValue}
									value={filterShape}
									onChange={(e) => handleShape(e, filterColor, filterCut)}
								/>
								{/* <Input
									type="text"
									id="shape"
									size="sm"
									onChange={(e) => handleShape(e)}
									name="shape"
									placeholder="Enter Shape"
								/> */}
							</Col>
							<Col lg="2" md="6">
								{/* <Label for="cut">Cut:</Label> */}

								<Select
									size="sm"
									isClearable={false}
									theme={selectThemeColors}
									placeholder="Select Cut"
									name="cut"
									className="react-select feed_select"
									classNamePrefix="select"
									options={cutDropDownValue}
									onChange={(e) => handleCut(e, filterColor, filterShape)}
									value={filterCut}
									// onChange={(e) => handleChange(e)}
								/>

								{/* <Input
									type="text"
									size="sm"
									name="cut"
									onChange={(e) => handleCut(e)}
									placeholder="Enter Cut"
								/> */}
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
							<Col lg="1" md="3" className="pl-0">
								{/* <Label for="send feed"></Label> */}
								{ftpvalue && ftpvalue.length > 0 && ftpFeedData?.results?.length > 0 ? (
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
										onClick={
											ftpFeedData?.results?.length == 0 ? () => sendFilter() : () => sendFeedClick()
										}
										style={{ opacity: '0.6' }}
										className="seed_button"
										block
									>
										Send Feed
									</Button.Ripple>
								)}
							</Col>
						</Row>
					</Form>
				</CardBody>
				<DataTable
					noHeader
					pagination
					// subHeader
					responsive
					paginationServer
					columns={columns}
					data={ftpFeedData.results}
					paginationTotalRows={ftpFeedData.count}
					paginationRowsPerPageOptions={datatable_per_raw}
					onChangeRowsPerPage={handlePerRowsChange}
					onChangePage={handlePageChange}
					sortIcon={<ChevronDown />}
					className="react-dataTable"
					fixedHeader
					fixedHeaderScrollHeight={dynamicHeight}
					paginationPerPage={table_data.per_page}
					// progressPending={ftpFeedData.length == 0 ? true : false}
				/>
			</Card>
		</Fragment>
	);
};

export default FtpFeedList;
