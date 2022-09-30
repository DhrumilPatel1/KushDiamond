import { Link, useParams } from 'react-router-dom';
import { ChevronLeft } from 'react-feather';
import { Card, CardBody, CardTitle, CardText, FormGroup, Label, Button, Input } from 'reactstrap';
import { useSkin } from '@hooks/useSkin';
import '@styles/base/pages/page-auth.scss';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { ResetPasswordRequest } from '../../../redux/ResetPasswordSlice';
import { useDispatch } from 'react-redux';

const resetPassword = yup.object().shape({
	password: yup.string().required('New password is required'),
	password: yup
		.string()
		.required('New password is required')
		.min(8, 'Must be 8 characters or more')
		.matches(/[@$!%*#?&]+/, 'One special character'),
	confirm_password: yup
		.string()
		.required('Confirm password is required')
		.oneOf([yup.ref('password'), null], 'New password does not match'),
});

const ResetPassword = () => {
	const { mq, link } = useParams();
	const ResetLink = mq + '/' + link;

	const dispatch = useDispatch();

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

						<Formik
							initialValues={{
								password: '',
								confirm_password: '',
							}}
							validationSchema={resetPassword}
							onSubmit={(values) => {
								dispatch(ResetPasswordRequest(values, ResetLink));
							}}
						>
							{({ errors, touched }) => (
								<Form className="auth-reset-password-form mt-2">
									<FormGroup>
										<Label className="form-label" for="new-password">
											New Password
										</Label>
										<Field
											type="password"
											id="password"
											name="password"
											className="form-control"
											placeholder="Enter Your New Password"
										/>
										{errors.password && touched.password ? (
											<div className="error-sm">{errors.password}</div>
										) : null}
									</FormGroup>
									<FormGroup>
										<Label className="form-label" for="confirm-password">
											Confirm Password
										</Label>
										<Field
											type="password"
											id="confirm_password"
											name="confirm_password"
											className="form-control"
											placeholder="Enter Your New Password"
										/>
										{errors.confirm_password && touched.confirm_password ? (
											<div className="error-sm">{errors.confirm_password}</div>
										) : null}
									</FormGroup>
									<Button.Ripple color="primary" type="submit" block>
										Set New Password
									</Button.Ripple>
								</Form>
							)}
						</Formik>
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
