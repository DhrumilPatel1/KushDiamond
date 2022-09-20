import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, Media } from 'reactstrap';
import Avatar from '@components/avatar';
import { TrendingUp, Box, DollarSign, Users } from 'react-feather';

const SubscribersGained = () => {
	const data = [
		{
			title: '230k',
			subtitle: 'Sales',
			color: 'light-primary',
			icon: <TrendingUp size={24} />,
		},
		{
			title: '8.549k',
			subtitle: 'Users',
			color: 'light-primary',
			icon: <Users size={24} />,
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
				<CardTitle tag="h4">Subscribers Gained</CardTitle>
			</CardHeader>
			<CardBody className="statistics-body">
				<Row>{renderData()}</Row>
			</CardBody>
		</Card>
	);
};

export default SubscribersGained;
