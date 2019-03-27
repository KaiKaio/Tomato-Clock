import axios from 'axios';

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

// Add a request interceptor (添加请求拦截器)
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

// Add a response interceptor (添加响应拦截器)
instance.interceptors.response.use((response) => {
	if(response.headers['x-token']){
		localStorage.setItem('x-token',response.headers['x-token'])
	}
	return response;
},  (error) => {
	// Do something with response error
	return Promise.reject(error);
});

export default instance