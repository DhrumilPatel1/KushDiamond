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
	Alert,
	CustomInput,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	excelTypeTwo,
	ExcelUploadTypeTwo,
	ImagesUploadRequest,
	ProductResetData,
	VideoSirvUploadRequest,
} from '../../../redux/productsSlice';
import { Share, CheckCircle } from 'react-feather';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// const BASE_URL_API = 'http://192.168.1.103:8000';
// const BASE_URL_API = 'http://67.202.30.86';

const ImagesUpload = () => {
	const accessToken = JSON.parse(localStorage.getItem('accessToken'));
	const dispatch = useDispatch();
	const history = useHistory();
	const { ImageUploaFileData, error, isLoading } = useSelector((state) => state.products);
	const [image, setImage] = useState([]);
	const [progressbar, setProgressbar] = useState(0);
	const [visible, setVisible] = useState(false);
	const [showRadioValue, setShowRadioValue] = useState(false);
	const [video, setVideo] = useState([]);

	const closeAlert = () => {
		setVisible(false);
	};

	const handleChange = (e) => {
		setImage(e.target.files);
	};
	var count = 0;
	var toastId;

	const handleFileUpload = async (formData, dataArray) => {
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_BASE_URL_API}/api/uploadfile/`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: accessToken,
					},
				}
			);
			count = count + 1;
			if (result?.data?.statusCode === 200) {
				setProgressbar(() => parseInt((count * 100) / Object.keys(dataArray).length));
				if (count == Object.keys(dataArray).length) {
					toast.success(result?.data?.message, {
						id: toastId,
					});
					setProgressbar(100);
					setVisible(true);
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

	const handleVideoChange = (e) => {
		setVideo(e.target.files);
	};

	const handleVideoSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();

		[...video].forEach((file) => {
			formData.append('product_img', file),
				formData.append(
					'folder_name',
					file.webkitRelativePath.substring(0, file.webkitRelativePath.lastIndexOf('/') + 1)
				);
		});
		dispatch(VideoSirvUploadRequest(formData));
		e.target.reset();
		setVideo([]);
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

						<Col>
							<Alert
								color="success"
								className="cursor-pointer"
								isOpen={visible}
								onClick={closeAlert}
							>
								<div className="alert-body">
									<CheckCircle
										size={20}
										className="bg-white rounded mr-1"
										style={{ padding: '3px' }}
									/>
									Product Images successfully upload. Now you can upload Inventory Excel (Excel Type
									2).
								</div>
							</Alert>
						</Col>

						<Col md="12" sm="12">
							<p color="relief-danger">
								NOTE *<br></br>
								<b>
									{showRadioValue == true ? 'File' : 'Folder'} Name is mandatory as SKU No.
									Only&nbsp;
									{showRadioValue == true ? 'Video' : 'Image And Video'} Format are allowed.
								</b>
							</p>
							<div>
								<CustomInput
									type="radio"
									id="image_upload"
									name="customRadio"
									className="mb-1"
									// inline
									label="Image upload"
									onChange={() => setShowRadioValue(false)}
									defaultChecked
								/>
								<CustomInput
									type="radio"
									id="sirv_upload"
									name="customRadio"
									// inline
									label="Upload video mp4 video to generate spin"
									onChange={() => setShowRadioValue(true)}
								/>
							</div>
							{showRadioValue == true ? (
								<Form className="mt-1" onSubmit={(e) => handleVideoSubmit(e)}>
									<FormGroup>
										<Label for="folder_video_path">Video Upload</Label>
										<Input
											type="file"
											name="product_img"
											accept="video/*"
											onChange={(e) => handleVideoChange(e)}
											webkitdirectory=""
											directory=""
											multiple
										/>
										{/* {error && error?.message ? (
											<div className="error-sm">{error?.message}</div>
										) : null} */}
									</FormGroup>
									<FormGroup className="d-flex mb-0">
										{isLoading == true || video?.length === 0 ? (
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
							) : (
								<Form className="mt-1" onSubmit={(e) => handleSubmit(e)}>
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

										{/* {error && error?.message ? (
											<div className="error-sm">{error?.message}</div>
										) : null} */}
									</FormGroup>
									<FormGroup className="d-flex mb-0">
										{isLoading == true || image?.length === 0 ? (
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
							)}
						</Col>
					</Row>
				</CardBody>
			</Card>
		</>
	);
};

export default ImagesUpload;
