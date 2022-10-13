import { Award } from 'react-feather';
import Avatar from '@components/avatar';
import { Card, CardBody, CardText } from 'reactstrap';
import decorationLeft from '@src/assets/images/elements/decore-left.png';
import decorationRight from '@src/assets/images/elements/decore-right.png';
import { getUserData } from '../../configs/LocalStorageData';

const CardWelcome = () => {
	return (
		<Card className="card-congratulations">
			<CardBody className="text-center">
				<img className="congratulations-img-left" src={decorationLeft} alt="decor-left" />
				<img className="congratulations-img-right" src={decorationRight} alt="decor-right" />
				<Avatar icon={<Award size={28} />} className="shadow" color="primary" size="xl" />
				<div className="text-center">
					<h1 className="mb-1 text-white">
						Welcome{' '}
						{getUserData.username.charAt(0).toUpperCase() + getUserData.username.slice(1) ||
							getUserData.name.charAt(0).toUpperCase() + getUserData.name.slice(1)}{' '}
						,
					</h1>
					<CardText className="m-auto w-75">
						You have successfully logged in as an {getUserData.role} to Kush Diamond. Now you can
						start to explore. Enjoy!
					</CardText>
				</div>
			</CardBody>
		</Card>
	);
};

export default CardWelcome;
