//对axios二次封装
import axios from "axios";
//引入进度条
import nProgress from "nprogress";
//引入进度条的样式
import 'nprogress/nprogress.css'

let requests = axios.create({

    //请求地址自动加个/api
    baseURL:'/mock',
    //请求时间超时
    timeout:5000,
})
//请求拦截器
requests.interceptors.request.use((config) =>{
    nProgress.start();
    //config中有一个重要属性，headers请求头
    return config
})
//响应拦截器
requests.interceptors.response.use((res) =>{
    //成功时直接返回数据
    nProgress.done();
    return res.data
},(err) =>{
    //终止promise链并返回错误信息
    return Promise.reject(new Error(err.message))
})

export default requests