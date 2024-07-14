import type {AxiosError} from 'axios'
import WebClient from 'web-client-starter'
import {storage, StorageKeys} from '../utils/storage'

WebClient.interceptor.request(config => {
  const {token} = storage.getItem(StorageKeys.AUTH, {token: ''})
  config.headers.Authorization = `Bearer ${token}`
  return config
})

WebClient.interceptor.response(
  response => response,
  (error: AxiosError) => {
    return Promise.reject(error.response?.data ?? error)
  }
)

export default WebClient
