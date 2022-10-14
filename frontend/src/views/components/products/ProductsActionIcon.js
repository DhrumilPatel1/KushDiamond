import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Image, Trash2 } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { ImageUploadDeleteRequest } from '../../../redux/productsSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ReactTooltip from 'react-tooltip';

const ToastSwal = withReactContent(Swal);
const ProductsActionIcon = (props) => {
	const getLoginData = JSON.parse(localStorage.getItem('userData'));

	// useEffect(() => {
	// 	const getUserData = JSON.parse(localStorage.getItem('userData'));
	// 	if (getUserData) {
	// 		setUser(getUserData);
	// 	}
	// }, []);

	const dispatch = useDispatch();

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

	return (
		<>
			{props?.row?.product_images?.length > 0 ? (
				<>
					<Image
						// id="UnControlledExample"
						data-tip
						data-for="view_gallery"
						size={18}
						className="text-dark ml-2"
						onClick={() => props.clickOpenGallarey(props.row.product_images)}
						style={{ cursor: 'pointer' }}
					/>

					<ReactTooltip id="view_gallery" className="tooltip_info" place="top" effect="solid">
						View Gallary
					</ReactTooltip>
				</>
			) : (
				<Image
					size={18}
					className="text-dark ml-2 gallary_disabled"
					style={{ cursor: 'not-allowed' }}
				/>
			)}

			<Link to={`/products/detail/${props.id}`} className="text-primary">
				<Eye size={18} className="ml-1" data-tip data-for="view_product" />
			</Link>
			<ReactTooltip id="view_product" className="tooltip_info" place="top" effect="solid">
				View Product
			</ReactTooltip>

			{getLoginData?.role === 'admin' ? (
				<>
					<Trash2
						className="text-danger ml-1"
						data-tip
						data-for="images_delete"
						size={18}
						onClick={() => handleDeleteById(props.id)}
						style={{ cursor: 'pointer' }}
					/>

					<ReactTooltip id="images_delete" className="tooltip_info" place="top" effect="solid">
						Delete Images
					</ReactTooltip>
				</>
			) : null}
		</>
	);
};

export default ProductsActionIcon;
