import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Eye } from 'react-feather';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ProductsDetialRequest } from '../../../redux/productsSlice';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/scss/image-gallery.scss';

const ProductsActionIcon = (props) => {
	const [modal, setModal] = useState(null);
	const dispatch = useDispatch();
	const { productViewData, error } = useSelector((state) => state.products);
	console.log(productViewData, 'modal');
	const toggleModal = (id) => {
		console.log(id, 'id');
		if (modal !== id) {
			setModal(id);
			dispatch(ProductsDetialRequest(id));
		} else {
			setModal(null);
		}
	};

	var getAllImages = [];
	const getImages =
		productViewData &&
		productViewData?.images?.map((image) => {
			var images = {
				original: image,
				thumbnail: image,
			};
			return getAllImages.push(images);
		});
	return (
		<>
			<Eye
				size={18}
				className="text-primary"
				onClick={() => toggleModal(props.id)}
				style={{ cursor: 'pointer' }}
			/>

			<Modal
				isOpen={modal === props.id}
				toggle={() => toggleModal(props.id)}
				className={`modal-dialog-centered modal-xl`}
				key={props.id}
			>
				<ModalHeader toggle={() => toggleModal(props.id)}></ModalHeader>
				<ModalBody>
					{productViewData && productViewData?.images?.length > 0 ? (
						<div className="image_slider">
							<ImageGallery
								items={getAllImages}
								showPlayButton={false}
								// showFullscreenButton={false}
							/>
							;
						</div>
					) : (
						<>
							<h1>Images Not Found</h1>
						</>
					)}
				</ModalBody>
				<ModalFooter>
					<Button color="secondary" size="sm" onClick={() => toggleModal(props.id)} outline>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>

			<Link to={`/products/edit/${props.id}`} className="text-warning mx-1">
				<Edit size={18} />
			</Link> 
		</>
	);
};

export default ProductsActionIcon;
