import axios from 'axios';
import history from './history'

// 您的 app_id 是：zUh9Fr63HwgjWEP9yuEbQjEd
// 您的 app_secret 是：Pqhvjon1JEmDNhieWkKJ9KDZ

const appID = "zUh9Fr63HwgjWEP9yuEbQjEd"
const appSecret = "Pqhvjon1JEmDNhieWkKJ9KDZ"

/* tslint:disable:no-string-literal */
const instance = axios.create({
	baseURL: 'https://gp-server.hunger-valley.com/',
	headers: {
		't-app-id': appID,
		't-app-secret': appSecret
	}
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
	const xToken = localStorage.getItem('x-token')
	if(xToken){
		config.headers['Authorization'] = `Bearer ${xToken}`
	}
	return config;
},  (error) => {
	console.error(error)
	return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use((response) => {
	// Do something with response data
	if(response.headers['x-token']){
		localStorage.setItem('x-token',response.headers['x-token'])
	}
	return response;
},  (error) => {
	if(error.response.status === 401){
		console.log("重定向");
		history.push('/login')
	}
	// Do something with response error
	return Promise.reject(error);
});

/* tslint:enable:no-string-literal */
export default instance