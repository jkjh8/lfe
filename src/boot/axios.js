import Vue from 'vue'
import axios from 'axios'
import cookie from 'vue-cookie'
import { Store } from '../store'

axios.defaults.baseURL = `http://${window.location.hostname}:3000`

axios.interceptors.request.use(config => {
  const accessToken = cookie.get('accessToken')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
}, error => {
  Promise.reject(error)
})

axios.interceptors.response.use((response) => {
  return response
}, function (error) {
  const originalRequest = error.config
  console.log(originalRequest.url)
  if (error.response.status === 401 && originalRequest.url === '/auth/refresh') {
    Store.commit('user/updateUser', null)
    return Promise.reject(error)
  }
  if (error.response.status === 401 && !originalRequest._retry) {
    console.log('start refresh')
    originalRequest._retry = true
    const refreshToken = cookie.get('refreshToken')
    console.log(refreshToken)
    return axios.get('/auth/refresh', {
      headers: {
        refreshtoken: refreshToken
      }
    }).then(res => {
      console.log(res)
      if (res.status === 201) {
        if (res.data.user) {
          Store.commit('user/updateUser', res.data.user)
        }
        if (res.data.refreshToken) {
          cookie.set('refreshToken', res.data.refreshToken)
        }
        if (res.data.accessToken) {
          cookie.set('accessToken', res.data.accessToken)
          axios.defaults.headers.common.Authorization = 'Bearer ' + res.data.accessToken
        }
        return axios(originalRequest)
      }
    })
  }
  return Promise.reject(error)
})

Vue.prototype.$axios = axios
