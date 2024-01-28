import axios from 'axios'

axios.interceptors.response.use((response) => {
  return response
}, (err) => {
  return Promise.reject(err)
})

export default axios
