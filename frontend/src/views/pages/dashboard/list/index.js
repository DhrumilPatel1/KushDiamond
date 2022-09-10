// ** User List Component
import Table from './Table';

// ** Styles
import '@styles/react/apps/app-users.scss';

const DashboardList = () => {
	return (
		<div className="app-user-list">
			{/* <h1>Dashboard</h1> */}
			<Table />
		</div>
	);
};

export default DashboardList;
