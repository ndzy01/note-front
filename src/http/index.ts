/*
 * @Author: ndzy
 * @Date: 2020-03-28 18:51:25
 * @LastEditTime: 2020-03-28 18:53:27
 * @LastEditors: ndzy
 */
import request from './request'

const api = (url: any, type: any, data: any) => {
  return request({
    url,
    method: type,
    data,
  })
}

export default api
