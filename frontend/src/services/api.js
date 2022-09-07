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
	return await axios
		.post(`${BASE_URL_API}/api/login/`, reqData, {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH',
		})
		.then((response) => response)
		.catch((err) => console.log(err, 'err'));
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

export const FtpList = async (queryString) => {
	return await axios
		.get(`${BASE_URL_API}/api/ftp/list/`, {
			headers,
		}).then((response) => response)
		.catch((err) => console.log(err));
		
};

