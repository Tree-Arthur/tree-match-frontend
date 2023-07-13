// Set config defaults when creating the myAxios
import axios, {AxiosInstance} from "axios";

const isDev = process.env.NODE_ENV === 'development';

//自定义Axios
const myAxios: AxiosInstance = axios.create({
    baseURL: isDev ? 'http://127.0.0.1:8080/api' : 'http://43.138.192.49:8080/api'// 'http://localhost:8080/api'
});
myAxios.defaults.withCredentials = true; //允许携带 cookie

// 导出
export default myAxios;

// Add a request interceptor 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    console.log('我要发请求', config)
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    console.log('我收到响应啦', response)
    if (response?.data?.code === 40100) {//如果响应代码为40100就是未登录
        const redirectUrl = window.location.href;
        //未登录跳转登录页
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    // Do something with response data
    return response.data;//统一返回data
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});