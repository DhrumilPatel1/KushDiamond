// ** React Imports
import { Fragment, useState, useEffect } from 'react';
// ** Columns
import { columns } from './columns';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
// ** Third Party Components
import { ChevronDown } from 'react-feather';
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
import { FtpGetDataList, productList, sendFeed } from '../../../../redux/productsSlice';
import { datatable_per_page, datatable_per_raw } from '../../../../configs/constant_array';
import { selectThemeColors } from '@utils';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import toast from 'react-hot-toast';

const OpenSwal = withReactContent(Swal);

const FtpFeedList = () => {
	// ** Store Vars
	const dispatch = useDispatch();
	const { ftpGetAllData, FeedData } = useSelector((state) => state.products);
	const { productData } = useSelector((state) => state.products);
	const getAllDropdownValue = ftpGetAllData.map((item) => item);
	const [limit, setPerPage] = useState(datatable_per_page);

	const [sort_order, setSort_order] = useState('desc');
	const [filterColor, setFilterColor] = useState('');
	const [filterShape, setFilterShape] = useState('');
	const [ftpvalue, setFtpValue] = useState([]);

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

	const ftpParams = {
		fTPSting: `color=${filterColor}&shape=${filterShape}&cut=${filterCut}`,
	};

	useEffect(() => {
		dispatch(FtpGetDataList());
	}, []);

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

	const handleChange = (e) => {
		setFtpValue(e);
	};

	const openPopup = () => {
		OpenSwal.fire({
			title: 'Are you sure?',
			text: `Products filtered total count: ${productData?.count}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'send Feed',
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

	useEffect(() => {
		dispatch(productList());
	}, []);

	const handleShape = (e) => {
		e.preventDefault();
		setFilterShape(e.target.value);
	};

	const handleCut = (e) => {
		e.preventDefault();
		setFilterCut(e.target.value);
	};
	const handleColor = (e) => {
		e.preventDefault();
		setFilterColor(e.target.value);
	};
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
							<Col lg="4" md="6">
								<Select
									size="sm"
									isClearable={false}
									theme={selectThemeColors}
									placeholder="Select FTP"
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
								<Input
									id="color"
									name="color"
									onChange={(e) => handleColor(e)}
									size="sm"
									placeholder="Enter Color"
								/>
							</Col>
							<Col lg="2" md="6">
								{/* <Label for="shape">Shape:</Label> */}
								<Input
									type="text"
									id="shape"
									size="sm"
									onChange={(e) => handleShape(e)}
									name="shape"
									placeholder="Enter Shape"
								/>
							</Col>
							<Col lg="2" md="6">
								{/* <Label for="cut">Cut:</Label> */}
								<Input
									type="text"
									size="sm"
									name="cut"
									onChange={(e) => handleCut(e)}
									placeholder="Enter Cut"
								/>
							</Col>
							<Col lg="1" md="3">
								{/* <Label for="cut"></Label> */}
								<Button.Ripple
									type="submit"
									size="sm"
									color="relief-primary"
									className="filter_button"
									block
								>
									Filter
								</Button.Ripple>
							</Col>
							<Col lg="1" md="3" className="pl-0">
								{/* <Label for="send feed"></Label> */}
								{ftpvalue && ftpvalue.length > 0 ? (
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
										disabled={true}
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
					data={productData.results}
					paginationTotalRows={productData.count}
					paginationRowsPerPageOptions={datatable_per_raw}
					onChangeRowsPerPage={handlePerRowsChange}
					onChangePage={handlePageChange}
					sortIcon={<ChevronDown />}
					className="react-dataTable"
					fixedHeader
					fixedHeaderScrollHeight="450px"
					paginationPerPage={table_data.per_page}
					progressPending={productData.length == 0 ? true : false}
				/>
			</Card>
		</Fragment>
	);
};

export default FtpFeedList;