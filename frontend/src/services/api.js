import axios from 'axios';

const BASE_URL_API = 'http://192.168.1.47:8000';

const accessToken = JSON.parse(localStorage.getItem('accessToken'));
let headers = {
	'Content-Type': 'application/json',
	Authorization: `Bearer ${accessToken}`,
};

const api = axios.create({
	baseURL: BASE_URL_API,
	headers,
});

export const AdminLoginAPI = async (reqData) => {
	return await axios.post(`${BASE_URL_API}/api/login/`, reqData, {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH',
	});
};

export const ProductApi = async (queryString) => {
	return await axios
		.get(`${BASE_URL_API}/api/product/list/?` + queryString, {
			headers,
		})
		.then((response) => response)
		.catch((err) => console.log(err));
};

export const ProductExcelUploadTypeOne = async (uploadexcel) => {
	return await axios
		.post(`${BASE_URL_API}/api/upload1/`, uploadexcel, {
			headers,
		})
		.then((response) => response)
		.catch((err) => console.log(err));
};

export const FtpListApi = async (queryString) => {
	return await axios
		.get(`${BASE_URL_API}/api/ftp/list/?` + queryString, {
			headers,
		})
		.then((response) => response)
		.catch((err) => console.log(err));
};

export const FtpCreateApi = async (reqData) => {
	return await axios.post(`${BASE_URL_API}/api/ftp/create/`, reqData, { headers });
};

export const FtpDeleteApi = async (delete_id) => {
	return await axios.delete(`${BASE_URL_API}/api/ftp/modify${delete_id}`,{ headers });
};
