import React, { useState } from 'react';
import { Upload } from 'react-feather';
import ReactTooltip from 'react-tooltip';
import { Button, Modal, ModalHeader, ModalBody, Label, FormGroup, Input, Form } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ImagesUploadRequest, productGetData, productList } from '../../../redux/productsSlice';

const SingleUploadImg = ({ row }) => {
	
	const [formModal, setFormModal] = useState(false);
	const dispatch = useDispatch();
	const { error, isLoading } = useSelector((state) => state.products);
	const [image, setImage] = useState([]);

	const handleChange = (e) => {
		const ProductImg = e.target.files;
		setImage(ProductImg);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();

		[...image].forEach((file) => {
			formData.append('product_img', file),
				formData.append(
					'folder_name',
					file.webkitRelativePath.substring(0, file.webkitRelativePath.lastIndexOf('/') + 1)
				);
		});
		dispatch(ImagesUploadRequest(formData));
		e.target.reset();
		setImage([]);
	};

	return (
		<>
			<Upload
				size={18}
				className="ml-1 outline-none cursor-pointer"
				onClick={() => setFormModal(!formModal)}
				data-tip
				data-for={`upload_media${row.sku}`}
			/>

			<Modal
				isOpen={formModal}
				toggle={() => setFormModal(!formModal)}
				className="modal-dialog-centered modal-sm"
			>
				<ModalHeader toggle={() => setFormModal(!formModal)}>Upload Single Folder</ModalHeader>
				<ModalBody>
					<Form onSubmit={(e) => handleSubmit(e)}>
						<FormGroup>
							<Label for="folder_path">Folder Upload</Label>
							<Input
								type="file"
								name="product_img"
								accept="image/*"
								onChange={(e) => handleChange(e)}
								webkitdirectory=""
								directory=""
								multiple
							/>
							{error && error?.message ? <div className="error-sm">{error?.message}</div> : null}
						</FormGroup>
						<FormGroup className="d-flex mb-0">
							{isLoading == true || image.length === 0 ? (
								<Button.Ripple className="mr-1" size="sm" color="primary" type="submit" disabled>
									Submit
								</Button.Ripple>
							) : (
								<Button.Ripple className="mr-1" size="sm" color="primary" type="submit">
									Submit
								</Button.Ripple>
							)}
						</FormGroup>
					</Form>
				</ModalBody>
				{/* <ModalFooter>
					{isLoading == true || image.length === 0 ? (
						<Button.Ripple className="mr-1" size="sm" color="primary" type="submit" disabled>
							Submit
						</Button.Ripple>
					) : (
						<Button.Ripple
							className="mr-1"
							size="sm"
							color="primary"
							type="submit"
							onSubmit={(e) => handleSubmit(e)}
						>
							Submit
						</Button.Ripple>
					)}
				</ModalFooter> */}
			</Modal>

			<ReactTooltip id={`upload_media${row.sku}`} className="tooltip_info" place="top" effect="solid">
				Upload media for {row.sku}
			</ReactTooltip>
		</>
	);
};

export default SingleUploadImg;
