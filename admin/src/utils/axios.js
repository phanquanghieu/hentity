import axios from 'axios'
import local from './local'

const instance = axios.create({ baseURL: process.env.BACKEND_URL + '/admin_api' })

instance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${local.getJwtToken()}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    return config
  },
  (error) => {
    console.error(error)
  }
)

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      local.clear()
      window.location.reload()
    }
    console.error(error)
  }
)

export default instance
