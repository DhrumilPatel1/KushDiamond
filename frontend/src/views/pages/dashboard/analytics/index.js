// import { kFormatter } from '@utils';
import { Row, Col, Card, CardHeader, CardTitle, CardBody, Media } from 'reactstrap';
import '@styles/react/libs/charts/apex-charts.scss';
import CardWelcome from '../../../ui-elements/CardWelcome';
import SubscribersGained from '../../../ui-elements/SubscribersGained';
import OrdersReceived from '../../../ui-elements/OrdersReceived';
import { useDispatch, useSelector } from 'react-redux';
import { useDeferredValue, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import { changepasswordResetData } from '../../../../redux/ChagePasswordSlice';
import { productList } from '../../../../redux/productsSlice';
import useProductData from '../../../../CustomeHook/useProductData';
import useUserData from '../../../../CustomeHook/useUserData';

const AnalyticsDashboard = () => {
	// const { colors } = useContext(ThemeColors)
	const dispatch = useDispatch();
	const { changePasswordData, error } = useSelector((state) => state.changePassword);
	const {productData} = useProductData();
	const {userList,isLoading} = useUserData();
	return (
		<div id="dashboard-analytics">
			<Row className="match-height">
				<Col lg="6" sm="12">
					<CardWelcome />
				</Col>
				<Col lg="3" sm="6">
					<SubscribersGained userList={userList?.count}/>
				</Col>
				<Col lg="3" sm="6">
					<OrdersReceived productCount={productData?.count}  />
				</Col>
			</Row>
		</div>
	);
};

export default AnalyticsDashboard;
