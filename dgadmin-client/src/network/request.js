import axios from "axios"
import {message} from 'antd'
export const request = (options) => {
  return new Promise((reslove,reject) => {
    const instance = axios.create({
      timeout:5000
    })
    instance.interceptors.response.use(data => {
      return data.data
    })
    instance(options).then(res => {
      reslove(res)
    }).catch(err => {
      message.error(err.message)
    })
  })
 
}

