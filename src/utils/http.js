import Vue from 'vue'
import axios from 'axios'
import { Toast } from 'vant' // 导入vant组件库中的轻提示组件

import 'vant/lib/index.css'

Vue.use(Toast) // 全局使用轻提示

axios.defaults.withCredentials = true // 设置允许跨域携带cookie

const http = axios.create({
  // baseURL: '/api',
  timeout: 5000,
  // headers: {
  //   showLoading: true
  // }
})

http.defaults.headers.post['Content-Type'] = 'application/json; UTF-8'

// 使用axios提供的封装方法的好处就是可以使用axios的拦截器
// 数据请求之前 在发送请求之前拦截
http.interceptors.request.use(
  config => {
    if (config.url != '/v1/pois') { // 如果当前请求的接口是搜索地址时，不使用加载动画
      Toast.loading({ // 发送请求之前弹出加载提示
        message: '加载中...',
        duration: 0,
        forbidClick: true
      })
    }
    // Toast('数据请求之前')
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// http.interceptors.request.use(function (config) {
//   return config
// }, function (error) {
//   return Promise.reject(error)
// })

// 数据响应之后 在数据返回之前拦截就是在.then()之前
http.interceptors.response.use(
  response => {
    Toast.clear() // 数据响应之后清除加载提示

    return response
  },
  error => {
    return Promise.reject(error)
  }
)
// http.interceptors.response.use(function (response) {
//   return response
// }, function (error) {
//   return Promise.reject(error)
// })

export default http