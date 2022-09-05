import { Link } from 'react-router-dom';
import { ChevronLeft } from 'react-feather';
import InputPassword from '@components/input-password-toggle';
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Button } from 'reactstrap';
import { useSkin } from '@hooks/useSkin';
import '@styles/base/pages/page-auth.scss';

const ResetPassword = () => {
	const [skin, setSkin] = useSkin();

	const illustration = skin === 'dark' ? 'image_main.png' : 'image_main.png',
		source = require(`@src/assets/images/logo/${illustration}`).default;

	return (
		<div className="auth-wrapper auth-v1 px-2">
			<div className="auth-inner py-2">
				<Card className="mb-0">
					<CardBody>
						<Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
							<img className="img-fluid" style={{ width: '30px' }} src={source} alt="Login V2" />
							<h2 className="brand-text text-primary ml-1" style={{ margin: '0px' }}>
								Kush Diamond
							</h2>
						</Link>
						<CardTitle tag="h4" className="mb-1">
							Reset Password 🔒
						</CardTitle>
						<CardText className="mb-2">
							Your new password must be different from previously used passwords
						</CardText>
						<Form className="auth-reset-password-form mt-2" onSubmit={(e) => e.preventDefault()}>
							<FormGroup>
								<Label className="form-label" for="new-password">
									New Password
								</Label>
								<InputPassword className="input-group-merge" id="new-password" autoFocus />
							</FormGroup>
							<FormGroup>
								<Label className="form-label" for="confirm-password">
									Confirm Password
								</Label>
								<InputPassword className="input-group-merge" id="confirm-password" />
							</FormGroup>
							<Button.Ripple color="primary" block>
								Set New Password
							</Button.Ripple>
						</Form>
						<p className="text-center mt-2">
							<Link to="/">
								<ChevronLeft className="mr-25" size={14} />
								<span className="align-middle">Back to login</span>
							</Link>
						</p>
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

export default ResetPassword;
