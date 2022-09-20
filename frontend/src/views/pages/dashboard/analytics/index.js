// import { kFormatter } from '@utils';
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap';
import '@styles/react/libs/charts/apex-charts.scss';
import CardWelcome from '../../../ui-elements/CardWelcome';
import SubscribersGained from '../../../ui-elements/SubscribersGained';
import OrdersReceived from '../../../ui-elements/OrdersReceived';

const AnalyticsDashboard = () => {
	// const { colors } = useContext(ThemeColors)

	return (
		<div id="dashboard-analytics">
			<Row className="match-height">
				<Col lg="6" sm="12">
					<CardWelcome />
				</Col>
				<Col lg="3" sm="6">
					<SubscribersGained />
				</Col>
				<Col lg="3" sm="6">
					<OrdersReceived />
				</Col>
			</Row>
		</div>
	);
};

export default AnalyticsDashboard;
