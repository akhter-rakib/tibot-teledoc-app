import axios from './axios'
import endpoints from '../config/endpoints'

export default async (token) => {
  const headers = {
    headers: {
      token
    }
  }
  try {
    const response = await axios.get(endpoints.COMPLETE_CASES, headers)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}
