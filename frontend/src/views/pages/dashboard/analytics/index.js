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

const AnalyticsDashboard = () => {
	// const { colors } = useContext(ThemeColors)
	const  dispatch =useDispatch()
	const { changePasswordData, error } = useSelector((state) => state.changePassword);

	useEffect(()=>{
		if(changePasswordData.statusCode==200){
		toast.success(changePasswordData.message)
		dispatch(changepasswordResetData())
		}
		},[changePasswordData])

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
