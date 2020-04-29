/*
 * @Author: ndzy
 * @Date: 2020-03-28 18:41:49
 * @LastEditTime: 2020-03-28 18:49:01
 * @LastEditors: ndzy
 */
import { message } from 'antd'
import axios from 'axios'
import settings from '../settings'

const service = axios.create({
  baseURL:
    // process.env.NODE_ENV === 'development' ? settings.url : settings.urlOnLine,
    process.env.NODE_ENV === 'development' ? settings.urlOnLine : settings.url,
  timeout: 60000, // 请求超时时间
})

//添加一个响应拦截器
service.interceptors.response.use(
  function (response) {
    if (response.data.code === 400) {
      message.error('编辑失败，内容不能为空！')
      return Promise.reject('编辑失败！')
    }
    return response
  },
  function (err) {
    message.error('网络错误！')
    return Promise.reject(err)
  }
)

export default service
