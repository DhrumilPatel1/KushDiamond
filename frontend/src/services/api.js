import axios from 'axios';
// import authHeader from "./auth-token";
const BASE_URL_API = 'http://192.168.1.47:8000';

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

export const ProductApi = async (queryString, config) => {
	return await axios
		.get(`${BASE_URL_API}/api/product/list/?` + queryString, config)
		.then((response) => response)
		.catch((err) => console.log(err));
};

export const ProductExcelUploadTypeOne = async (uploadexcel,config) => {
	return await axios.post(`${BASE_URL_API}/api/upload1/`, uploadexcel,config);
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
