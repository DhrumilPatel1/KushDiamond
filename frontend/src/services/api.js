import axios from 'axios';

const BASE_URL_API = 'http://192.168.1.47:8000';

const accessToken = JSON.parse(localStorage.getItem('accessToken'));

const api = axios.create({
	baseURL: BASE_URL_API,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH',
		Authorization: `${accessToken}`,
	},
});

export const AdminLoginAPI = async (reqData) => {
	return await axios
		.post(`${BASE_URL_API}/api/login/`, reqData, {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH',
		})
		.then((response) => response)
		.catch((err) => console.log(err));
};
