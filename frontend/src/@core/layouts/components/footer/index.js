// ** Icons Import
import { Heart } from 'react-feather';

const Footer = () => {
	return (
		<p className="clearfix">
			<span className="float-md-left d-block d-md-inline-block">
				COPYRIGHT © {new Date().getFullYear()}{' '}
				<a  target="_blank" rel="noopener noreferrer">
					Kush Diamond
				</a>
				<span className="d-none d-sm-inline-block">, All rights Reserved</span>
			</span>
			<span className="float-md-right d-none d-md-block">
				Hand-crafted & Made with
				<Heart size={14} />
			</span>
		</p>
	);
};

export default Footer;
