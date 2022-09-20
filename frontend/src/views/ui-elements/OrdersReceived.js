import React from 'react';
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, Media } from 'reactstrap';
import Avatar from '@components/avatar';
import { DollarSign, Package } from 'react-feather';

const OrdersReceived = () => {
	const data = [
		{
			title: '1.423k',
			subtitle: 'Products',
			color: 'light-warning',
			icon: <Package size={24} />,
		},

		{
			title: '$9745',
			subtitle: 'Revenue',
			color: 'light-success',
			icon: <DollarSign size={24} />,
		},
	];
	const renderData = () => {
		return data.map((item, index) => {
			return (
				<Col key={index}>
					<Media>
						<Avatar color={item.color} icon={item.icon} className="mr-2" />
						<Media className="my-auto" body>
							<h4 className="font-weight-bolder mb-0">{item.title}</h4>
							<CardText className="font-small-3 mb-0">{item.subtitle}</CardText>
						</Media>
					</Media>
				</Col>
			);
		});
	};
	return (
		<Card className="card-statistics">
			<CardHeader>
				<CardTitle tag="h4">Orders Received</CardTitle>
			</CardHeader>
			<CardBody className="statistics-body">
				<Row>{renderData()}</Row>
			</CardBody>
		</Card>
	);
};

export default OrdersReceived;
