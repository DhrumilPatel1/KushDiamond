// import { kFormatter } from '@utils';
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap';
import '@styles/react/libs/charts/apex-charts.scss';
import CardWelcome from '../../../ui-elements/CardWelcome';
import SubscribersGained from '../../../ui-elements/SubscribersGained';
import OrdersReceived from '../../../ui-elements/OrdersReceived';
import { useDispatch, useSelector } from 'react-redux';
import useDashboard from '../../../../CustomeHook/useDashboard';
import StatsCard from '../../../ui-elements/StatsCard';

const AnalyticsDashboard = () => {
	// const { colors } = useContext(ThemeColors)
	const dispatch = useDispatch();
	// const { changePasswordData, error } = useSelector((state) => state.changePassword);
	const { DashboardDataList } = useDashboard();
	return (
		<div id="dashboard-analytics">
			<Row className="match-height">
				<Col xl="6" md="6" xs="12">
					<CardWelcome />
				</Col>
				<Col xl="6" md="6" xs="12">
					<StatsCard
						cols={{ xl: '4', sm: '6' }}
						totalUser={
							DashboardDataList?.user_count == undefined ? 0 : DashboardDataList?.user_count
						}
						totalProduct={
							DashboardDataList?.product_count == undefined ? 0 : DashboardDataList?.product_count
						}
						availableProduct={
							DashboardDataList?.active_product_count == undefined
								? 0
								: DashboardDataList?.active_product_count
						}
						unavailableProduct={
							DashboardDataList?.inactive_product_count == undefined
								? 0
								: DashboardDataList?.inactive_product_count
						}
					/>
				</Col>
				{/* <Col lg="3" sm="6">
					<SubscribersGained userList={DashboardDataList?.user_count} />
				</Col>
				<Col lg="3" sm="6">
					<OrdersReceived productCount={DashboardDataList?.product_count} />
				</Col> */}
			</Row>
		</div>
	);
};

export default AnalyticsDashboard;
