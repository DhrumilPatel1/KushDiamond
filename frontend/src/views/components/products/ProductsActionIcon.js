import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Eye } from 'react-feather';

const ProductsActionIcon = (props) => {
	return (
		<>
			<Link to={`/products/details/${props.id}`} className="text-primary">
				<Eye size={18} />
			</Link>
			<Link to={`/products/edit/${props.id}`} className="text-warning mx-1">
				<Edit size={18} />
			</Link>
		</>
	);
};

export default ProductsActionIcon;
