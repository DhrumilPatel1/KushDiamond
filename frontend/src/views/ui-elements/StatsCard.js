import classnames from 'classnames';
import Avatar from '@components/avatar';
import { Slash, User, Box, CheckCircle } from 'react-feather';
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, Media } from 'reactstrap';

const StatsCard = ({ cols, totalUser, totalProduct, availableProduct, unavailableProduct }) => {
	const data = [
		{
			title: totalProduct,
			subtitle: 'Products',
			color: 'light-primary',
			icon: <Box size={24} />,
		},
		{
			title: availableProduct,
			subtitle: 'Available Products',
			color: 'light-success',
			icon: <CheckCircle  size={24} />,
		},
		{
			title: unavailableProduct,
			subtitle: 'Unavailable Products',
			color: 'light-danger',
			icon: <Slash size={24} />,
		},
		{
			title: totalUser,
			subtitle: 'Users',
			color: 'light-info',
			icon: <User size={24} />,
		},
	];

	const renderData = () => {
		return data.map((item, index) => {
			const margin = Object.keys(cols);
			return (
				<Col
					key={index}
					{...cols}
					className={
						classnames({
							[` mb-2 mb-${margin[0]}-0`]: index !== data.length - 1,
						}) + 'mt-0'
					}
				>
					<Media>
						<Avatar color={item.color} icon={item.icon} className="mr-2" />
						<Media className="my-auto" body>
							<h4 className="font-weight-bolder mb-0">{item.title}</h4>
							<CardText className="font-small-2 mb-0">{item.subtitle}</CardText>
						</Media>
					</Media>
				</Col>
			);
		});
	};

	return (
		<Card className="card-statistics">
			<CardHeader>
				<CardTitle tag="h4">Statistics</CardTitle>
			</CardHeader>
			<CardBody className="statistics-body">
				<Row>{renderData()}</Row>
			</CardBody>
		</Card>
	);
};

export default StatsCard;
