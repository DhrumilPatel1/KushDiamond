import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useSkin } from '@hooks/useSkin';
import { ChevronLeft } from 'react-feather';
import {
	Card,
	CardBody,
	CardTitle,
	CardText,
	Form,
	FormGroup,
	Label,
	Input,
	Button,
	FormFeedback,
} from 'reactstrap';
import '@styles/base/pages/page-auth.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const ForgotPassword = () => {
	const [skin, setSkin] = useSkin();

	const ForgotPasswordSchema = yup.object().shape({
		email: yup.string().email().required('The email field is required'),
	});

	const { register, errors, handleSubmit } = useForm({
		mode: 'onChange',
		resolver: yupResolver(ForgotPasswordSchema),
	});

	const illustration = skin === 'dark' ? 'image_main.png' : 'image_main.png',
		source = require(`@src/assets/images/logo/${illustration}`).default;

	const [value, setValue] = useState({
		email: '',
	});

	const onClick = () => {
		const { email } = value;
		const user = { email };
	};

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
							Forgot Password? 🔒
						</CardTitle>
						<CardText className="mb-2">
							Enter your email and we'll send you instructions to reset your password
						</CardText>
						<Form className="auth-forgot-password-form mt-2" onClick={handleSubmit(onClick)}>
							<FormGroup>
								<Label for="email">Email</Label>
								<Input
									id="email"
									type="email"
									name="email"
									innerRef={register({ required: true })}
									invalid={errors.email && true}
									defaultValue={value.email}
									onChange={(e) => (value['email'] = e.target.value)}
									placeholder="john@example.com"
								/>
								{errors && errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
							</FormGroup>
							<Button.Ripple color="primary" block>
								Send reset link
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

export default ForgotPassword;
