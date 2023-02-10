import axios from 'axios';
import { Toast } from 'vant';
import baseURL from '@/configs/config.js';
import { getStorage, removeStorage } from "@/utils/storage";
let isShowError = true;
// if (process.env && process.env.NODE_ENV != "development") {
//   axios.defaults.baseURL = baseURL.apiURL;
// }
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//lang zh,en,vie
// 请求拦截器
axios.interceptors.request.use(
  config => {
    config.timeout = 10000;

    const token = getStorage('token') || ''
    //如果是线上环境不走代理，需要把/api删除
    // if (process.env && process.env.NODE_ENV != "development") {
    //   config.url = config.url.replace('/api', '');
    // }
    config.headers['lang'] = getStorage('language') || 'zh'
    //登录注册接口不允许带入token
    if (config.url.indexOf('login/token') < 0) {
      token ? config.headers['token'] = 'bearer ' + token : ''
    }
    return config;
  },
  error => {
    return Promise.error(error);
  }
);
// 响应拦截器
axios.interceptors.response.use(
  response => {
    removeStorage({ 'name': 'error' })
    if (response.status === 200) {
      if (response.data.code == 20013) {
        if (isShowError) {
          isShowError = false
        }
      } else {
        return Promise.resolve(response);
      }
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response && error.response.data) {
      switch (error.response.data.code) {
        case 20001:
          if (isShowError) {

          }

          break;
        case 500:
          Toast({
            message: error.response.data.msg, type: 'fail'
          });
          break;
        // 其他错误，直接抛出错误提示
        default:
          Toast({
            message: error.response.data.msg, type: 'fail'
          });

      }
      return Promise.reject(error.response);
    } else {
      return Promise.reject(error);
    }
  }
);
/**
  * get方法，对应get请求
  * @param {String} url [请求的url地址]
  * @param {Object} params [请求时携带的参数]
  */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      })
  });
}

/**
  * post方法，对应post请求
  * @param {String} url [请求的url地址]
  * @param {Object} params [请求时携带的参数]
  */
export function post(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      })
  });
}
