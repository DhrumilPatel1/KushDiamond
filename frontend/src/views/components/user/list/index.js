// ** User List Component
import Table from './Table';

// ** Styles
import '@styles/react/apps/app-users.scss';

const UserList = () => {
	return (
		<div className="app-user-list">
			{/* <h1>FTP List</h1> */}
			<Table />
		</div>
	);
};

export default UserList;
