import React from 'react';
import { Edit, Trash2 } from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FtpClientList, FtpDeleteRequest } from '../../../redux/FtpsSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ToastSwal = withReactContent(Swal);

const FtpActionIcon = (props) => {
	const dispatch = useDispatch();

	const handleDeleteById = (id) => {
		ToastSwal.fire({
			title: 'Are you sure?',
			text: 'Once deleted, you will not be able to recover this data!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			customClass: {
				confirmButton: 'btn btn-primary',
				cancelButton: 'btn btn-outline-danger ml-1',
			},
			buttonsStyling: false,
		}).then(async (deleteRecord) => {
			if (deleteRecord.value) {
				await dispatch(FtpDeleteRequest(id));
				dispatch(FtpClientList());
			}
		});
	};

	return (
		<>
			<Link to={`/ftp/edit/${props.id}`} className="text-warning mx-1">
				<Edit size={18} />
			</Link>
			<Trash2
				className="text-danger"
				size={18}
				onClick={() => handleDeleteById(props.id)}
				style={{ cursor: 'pointer' }}
			/>
		</>
	);
};

export default FtpActionIcon;
