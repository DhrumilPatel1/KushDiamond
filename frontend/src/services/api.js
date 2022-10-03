import axios from 'axios';
// import authHeader from "./auth-token";
//const BASE_URL_API = 'http://52.44.30.44';
const BASE_URL_API = 'http://52.44.30.44';
const accessToken = JSON.parse(localStorage.getItem('accessToken'));
let headers = {
	'Content-Type': 'application/json',
	Authorization: `Bearer ${accessToken}`,
};

// console.log("accessToken",authHeader())

// const api = axios.create({
// 	baseURL: BASE_URL_API,
// 	headers,
// });

// console.log("accessToken---------",accessToken)
// console.log("accessToken---------",BASE_URL_API)

export const AdminLoginAPI = async (reqData) => {
	return await axios.post(`${BASE_URL_API}/api/login/`, reqData, {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH',
	});
};

export const ForgotPasswordAPI = async (reqData) => {
	return await axios.post(`http://192.168.1.32:8000/password-reset/`, reqData);
};

export const ChangePasswordApi = async (changePassword, config) => {
	return await axios.put(`${BASE_URL_API}/api/changepassword/`, changePassword, config);
};

export const ResetPasswordApi = async (changePassword,link, config) => {
	return await axios.patch(`http://192.168.1.32:8000/password-reset/${link}/`, changePassword, config);
};


export const ProductApi = async (queryString, config) => {
	return await axios
		.get(`${BASE_URL_API}/api/product/list/?` + queryString, config)
		.then((response) => response)
		.catch((err) => console.log(err));
};

export const ProductsDetailApi = async (view_id, config) => {
	return await axios.get(`${BASE_URL_API}/api/productview/${view_id}`, config);
};

export const ProductExcelUploadTypeOne = async (uploadexcel, config) => {
	return await axios.post(`${BASE_URL_API}/api/upload1/`, uploadexcel, config);
};

export const ExcelTypetwo = async (exceltwo, config) => {
	return await axios.post(`${BASE_URL_API}/api/upload2/`, exceltwo, config);
};

export const SendFeedAPI = async (SendFeedData, queryString, config) => {
	return await axios.post(`${BASE_URL_API}/api/send_feed/?` + queryString, SendFeedData, config);
};

export const FtpListApi = async (queryString, config) => {
	return await axios
		.get(`${BASE_URL_API}/api/ftp/list/?` + queryString, config)
		.then((response) => response)
		.catch((err) => console.log(err));
};

export const FtpGetAllApi = async (config) => {
	return await axios.get(`${BASE_URL_API}/api/get_ftp_data/`, config);
};

export const FtpCreateApi = async (reqData, config) => {
	return await axios.post(`${BASE_URL_API}/api/ftp/create/`, reqData, config);
};

export const FtpViewApi = async (view_id, config) => {
	return await axios.get(`${BASE_URL_API}/api/ftpclientview/${view_id}`, config);
};

export const FtpUpdateApi = async (update_id, updatedata, config) => {
	return await axios.put(`${BASE_URL_API}/api/ftp/modify/${update_id}`, updatedata, config);
};

export const FtpDeleteApi = async (delete_id, config) => {
	return await axios.delete(`${BASE_URL_API}/api/ftp/modify/${delete_id}`, config);
};

export const FtpLogListApi = async (queryString, config) => {
	return await axios.get(`${BASE_URL_API}/api/ftp_log/?` + queryString, config);
};

export const ImageUploadApi = async (imgFile, config) => {
	return await axios.post(`${BASE_URL_API}/api/uploadfile/`, imgFile, config);
};

export const ExcelLogListApi = async (queryString, config) => {
	return await axios.get(`${BASE_URL_API}/api/product_log/?` + queryString, config);
};

export const UserGetAllApi = async (queryString, config) => {
	return await axios.get(`${BASE_URL_API}/api/staff/list/?` + queryString, config);
};

export const UserCreateApi = async (reqData, config) => {
	return await axios.post(`${BASE_URL_API}/api/staff/create/`, reqData, config);
};
export const UserDeleteApi = async (userId, config) => {
	return await axios.delete(`${BASE_URL_API}/api/staff/modify/${userId}`, config);
};
export const UserViewApi = async (userId, config) => {
	return await axios.get(`${BASE_URL_API}/api/staffview/${userId}`, config);
};





