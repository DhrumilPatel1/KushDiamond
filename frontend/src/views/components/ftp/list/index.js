// ** User List Component
import Table from './Table';

// ** Styles
import '@styles/react/apps/app-users.scss';

const ProductsList = () => {
	return (
		<div className="app-user-list">
			<h1>Ftp List</h1>
			<Table />
		</div>
	);
};

export default ProductsList;
