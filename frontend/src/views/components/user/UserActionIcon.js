import React, { useEffect } from 'react';
import { Edit, Trash2 } from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FtpClientList, FtpDeleteRequest } from '../../../redux/FtpsSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { toast } from 'react-toastify';

const UserActionIcon = (props) => {
	const handleDeleteById = (id) => {
		console.log(id, 'id');
		// ToastSwal.fire({
		// 	title: 'Are you sure?',
		// 	text: 'Once deleted, you will not be able to recover this data!',
		// 	icon: 'warning',
		// 	showCancelButton: true,
		// 	confirmButtonText: 'Yes, delete it!',
		// 	customClass: {
		// 		confirmButton: 'btn btn-primary',
		// 		cancelButton: 'btn btn-outline-danger ml-1',
		// 	},
		// 	buttonsStyling: false,
		// }).then(async (deleteRecord) => {
		// 	if (deleteRecord.value) {
		// 		toast.success('Account successfully deleted.');
		// 		await dispatch(FtpDeleteRequest(id));
		// 		dispatch(FtpClientList());
		// 	}
		// });
	};
	return (
		<>
			<Trash2
				className="text-danger"
				size={18}
				onClick={() => handleDeleteById(props.id)}
				style={{ cursor: 'pointer' }}
			/>
		</>
	);
};

export default UserActionIcon;
