import { Button } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import errorImg from '@src/assets/images/pages/error.svg';
import '@styles/base/pages/page-misc.scss';
const illustration = 1 ? 'image_main.png' : 'image_main.png',
	source = require(`@src/assets/images/logo/${illustration}`).default;
const Error = () => {
	
	return (
		<div className="misc-wrapper">
			<NavLink to="/" className="navbar-brand">
				<span className="brand-logo">
					<img className="img-fluid" style={{ width: '30px' }} src={source} alt="Page Not Fund" />
					<h2 className="brand-text text-primary ml-1">
						Kush Diamond
					</h2>
				</span>
			</NavLink>
			<div className="misc-inner p-2 p-sm-3">
				<div className="w-100 text-center">
					<h2 className="mb-1">Page Not Found 🕵🏻‍♀️</h2>
					<p className="mb-2">Oops! 😖 The requested URL was not found on this server.</p>
					<Button tag={Link} to="/" color="primary" className="btn-sm-block mb-2">
						Back to home
					</Button>
					<img className="img-fluid" src={errorImg} alt="Not authorized page" />
				</div>
			</div>
		</div>
	);
};
export default Error;
