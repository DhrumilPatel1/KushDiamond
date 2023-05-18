// import { kFormatter } from '@utils';
import { Row, Col, Card, CardHeader, CardTitle, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import '@styles/react/libs/charts/apex-charts.scss';
import CardWelcome from '../../../ui-elements/CardWelcome';
import useDashboard from '../../../../CustomeHook/useDashboard';
import StatsCard from '../../../ui-elements/StatsCard';
import FtpFeedLogTable from '../../../ui-elements/FtpFeedLogTable';
import ShopifySyncLogTable from '../../../ui-elements/ShopifySyncLogTable';

const AnalyticsDashboard = () => {
	const { DashboardDataList } = useDashboard();
	const authRole = JSON.parse(localStorage.getItem('userData'));
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
			</Row>
			{authRole?.role === 'admin' ? (
				<Row className="match-height">
					<Col xs="12">
						<Card>
							<CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom py-1">
								<CardTitle tag="h4" style={{ fontSize: '20px' }}>
									Recent FTP Feed Log
								</CardTitle>
								<div className="d-flex mt-md-0 mt-1">
									<div>
										<Button.Ripple color="primary" size="sm" tag={Link} to={'/ftplog/list'}>
											<span className="align-middle">View All FTP Feed Log</span>
										</Button.Ripple>
									</div>
								</div>
							</CardHeader>
							<FtpFeedLogTable ftpLogList={DashboardDataList?.ftp_log} />
						</Card>
					</Col>
				</Row>
			) : null}

			<Row className="match-height">
				<Col xs="12">
					<Card>
						<CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom py-1">
							<CardTitle tag="h4" style={{ fontSize: '20px' }}>
								Recent Shopify Sync Log
							</CardTitle>
							<div className="d-flex mt-md-0 mt-1">
								<div>
									<Button.Ripple color="primary" size="sm" tag={Link} to={'/shopifySyncLog/list'}>
										<span className="align-middle">View All Shopify Sync Log</span>
									</Button.Ripple>
								</div>
							</div>
						</CardHeader>
						<ShopifySyncLogTable shopifySyncLogList={DashboardDataList?.shopify_sync_log} />
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default AnalyticsDashboard;
