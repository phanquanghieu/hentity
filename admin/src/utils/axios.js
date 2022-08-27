import axios from 'axios'
// import axiosRetry from 'axios-retry'
import qs from 'qs'
import local from './local'

const instance = axios.create({ baseURL: process.env.BACKEND_URL + '/admin_api' })
// axiosRetry(instance, {
//   retries: 0,
// })

instance.interceptors.request.use(
  (config) => {
    config.headers = {
      Authorization: `Bearer ${local.getJwtToken()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    config.paramsSerializer = (params) => qs.stringify(params, { encode: false })

    return config
  },
  (error) => {
    console.error(error)
  }
)

instance.interceptors.response.use(
  (response) => response.data,
  (error, ...rest) => {
    if (error?.response?.status === 401) {
      local.clear()
      window.location.reload()
    }
    console.error(error)
    return error.response.data
  }
)

export default instance
