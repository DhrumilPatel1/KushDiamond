import React from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'react-feather';

const ProductsActionIcon = (props) => {
	return (
		<>
			<Link to={`/products/details/${props.id}`} className="text-warning mx-1">
				<Eye size={18} />
			</Link>
		</>
	);
};

export default ProductsActionIcon;
