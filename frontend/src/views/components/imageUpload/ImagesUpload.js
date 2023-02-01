import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Button,
	Card,
	CardBody,
	Col,
	FormGroup,
	Label,
	Row,
	Form,
	Input,
	Progress,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	excelTypeTwo,
	ExcelUploadTypeTwo,
	ImagesUploadRequest,
	ProductResetData,
} from '../../../redux/productsSlice';
import { Share } from 'react-feather';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const BASE_URL_API = 'http://192.168.1.107:8000';

const ImagesUpload = () => {
	const accessToken = JSON.parse(localStorage.getItem('accessToken'));
	const dispatch = useDispatch();
	const history = useHistory();
	const { ImageUploaFileData, error, isLoading } = useSelector((state) => state.products);
	const [image, setImage] = useState([]);
	const [progressbar, setProgressbar] = useState(0);
	const handleChange = (e) => {
		setImage(e.target.files);
	};
	var count = 0;
	var toastId;

	const handleFileUpload = async (formData, dataArray) => {
		try {
			const result = await axios.post(`${BASE_URL_API}/api/uploadfile/`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: accessToken,
				},
			});
			count = count + 1;
			if (result?.data?.statusCode === 200) {
				setProgressbar(() => parseInt((count * 100) / Object.keys(dataArray).length));
				if (count == Object.keys(dataArray).length) {
					toast.success(result?.data?.message, {
						id: toastId,
					});
					setProgressbar(100);
				}
			}
		} catch (error) {
			const { statusCode, errors } = error?.response?.data;
			if (statusCode === 422) {
				toast.error(errors.message, {
					id: toastId,
				});
			}
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		toastId = toast.loading('Please wait your folder is Uploading...');
		var dataArray = {};
		[...image].forEach((file) => {
			let folderName1 = file.webkitRelativePath.split('/').length;
			if (folderName1 == 2) {
				var myfile = 0;
			} else {
				myfile = 1;
			}
			let folderName = file.webkitRelativePath.split('/')[myfile];
			if (folderName in dataArray) {
				dataArray[folderName].push(file);
			} else dataArray[folderName] = [file];
		});
		for (const key in dataArray) {
			let formData = new FormData();
			if (Object.hasOwnProperty.call(dataArray, key)) {
				const element = dataArray[key];
				element.forEach((file) => {
					let folderName = file.webkitRelativePath
						.substring(0, file.webkitRelativePath.lastIndexOf('/'))
						.split('/');
					formData.append('product_img', file);
					formData.append('folder_name', folderName[folderName.length - 1]);
					// formData.append(
					//     'folder_name',
					//     file.webkitRelativePath.substring(0, file.webkitRelativePath.lastIndexOf('/') + 1)
					// );
				});
				setProgressbar(1);
				handleFileUpload(formData, dataArray);

				// dispatch(ImagesUploadRequest(formData, { optionsVal }));
			}
		}
		e.target.reset();
		setImage([]);
	};
	const hisToryeBack = () => {
		history.goBack();
	};
	useEffect(() => {
		if (progressbar == 100) {
			setProgressbar(0);
		}
	}, [progressbar]);
	return (
		<>
			<Card>
				<CardBody>
					<Row>
						{/* <Col md="3" sm="12">
							<Form onSubmit={(e) => excelUpload(e)}>
								<FormGroup>
									<Label for="folder_path">Excel Upload Type Two</Label>
									<Input type="file" onChange={(e) => ExcelTypeTwo(e)} />
								</FormGroup>
								{isLoading == true || excelFile == false ? (
									<Button.Ripple className="mr-1" color="dark" type="submit" disabled>
										Submit
									</Button.Ripple>
								) : (
									<Button.Ripple className="mr-1" color="dark" type="submit">
										Submit
									</Button.Ripple>
								)}
							</Form>
						</Col> */}
						<Col md="12" sm="12">
							<p>
								NOTE *<br></br>
								<b>Folder Name is mandatory as SKU No. Only Image And Video Format are allowed.</b>
							</p>
							<Form onSubmit={(e) => handleSubmit(e)}>
								<FormGroup>
									<Label for="folder_path">Folder Upload</Label>
									<Input
										type="file"
										name="product_img"
										accept="image/*"
										onChange={(e) => handleChange(e)}
										webkitdirectory="true"
										directory=""
										multiple
									/>
									<ul id="listing"></ul>
									{progressbar > 0 ? (
										<div className="demo-vertical-spacing">
											<Progress min={0} max={100} value={progressbar}>
												{progressbar}%
											</Progress>
										</div>
									) : null}

									{error && error?.message ? (
										<div className="error-sm">{error?.message}</div>
									) : null}
								</FormGroup>
								<FormGroup className="d-flex mb-0">
									{isLoading == true || image.length === 0 ? (
										<Button.Ripple
											className="mr-1"
											size="sm"
											color="primary"
											type="submit"
											disabled
										>
											Submit
										</Button.Ripple>
									) : (
										<Button.Ripple className="mr-1" size="sm" color="primary" type="submit">
											Submit
										</Button.Ripple>
									)}
									<Button.Ripple
										className="mr-1"
										size="sm"
										outline
										onClick={(e) => hisToryeBack(e)}
									>
										Back
									</Button.Ripple>
								</FormGroup>
							</Form>
						</Col>
					</Row>
				</CardBody>
			</Card>
		</>
	);
};

export default ImagesUpload;
