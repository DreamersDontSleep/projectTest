//封装axios
import axios from 'axios';
import {Message, MessageBox} from 'element-ui';
// 创建axios实例
const request = axios.create({
    timeout: 15000, // 请求超时时间
});
// http request 拦截器
request.interceptors.request.use(config => {
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

request.interceptors.response.use(function (response) {
    // 请求成功处理回调
    return response.data
}, function (error) {
    if (error.message.includes('timeout')) {   // 判断请求异常信息中是否含有超时timeout字符串
        // Message({
        //     message: '请求超时，请稍后重试！',
        //     type: 'error',
        //     duration: 2 * 1000
        // });
        return Promise.reject(error);          // reject这个错误信息
    }
    // Message({
    //     message: error.message,
    //     type: 'error',
    //     duration: 5 * 1000
    // });
    return Promise.reject(error);
});

export default request;




