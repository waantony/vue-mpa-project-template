import Axios from 'axios'
import { Toast } from 'vant'
import { getLocal, removeLocal } from '@/utils/storage'

const { VUE_APP_baseURL, NODE_ENV } = process.env

Toast.allowMultiple()
Toast.setDefaultOptions({
  forbidClick: true,
})

// 配置axios基本项
const axios = Axios.create({
  baseURL: NODE_ENV === 'production' ? VUE_APP_baseURL : '',
})

// 请求拦截函数，接收配置对象为参数，用于动态修改请求配置
const reqFn = config => {
  config.headers.token = getLocal('token')
  return config
}

// 响应拦截函数，接收响应对象为参数，用于根据响应结果做出相应操作
// 响应成功(status === 2xx)时会被调用
const resFn = res => {
  const { code, msg } = res.data
  if (+code === 1) {
    return res
  }
  if (+code === 401) {
    removeLocal('token')
    location.reload()
    return null
  }
  Toast.fail({
    message: msg,
    duration: 2000,
  })
  return Promise.reject(res)
}

// 请求/响应 错误的函数（Status Code 失败情况）
const errorFn = (msg = '') => error => {
  Toast.fail({
    message: msg,
    duration: 2000,
  })
  return Promise.reject(error)
}

// 请求、响应拦截器
axios.interceptors.request.use(reqFn, errorFn('请求出错\n请稍后重试'))
axios.interceptors.response.use(resFn, errorFn('响应出错\n请稍后重试'))

// 请求方法
const REQ = function ({ method = 'POST', url, data = {}, timeout = 20 * 1000, isShowLoading = true } = {}) {
  let toast = null
  isShowLoading && (toast = Toast.loading({
    duration: 0,
    forbidClick: true,
  }))
  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      [method.toUpperCase() === 'POST' ? 'data' : 'params']: data,
      timeout,
    }).then(res => {
      resolve(res?.data?.data)
    }).catch(error => {
      reject(error)
    }).finally(() => {
      toast && toast.clear()
    })
  })
}

export {
  REQ,
}

export default REQ
