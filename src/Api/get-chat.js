import axios from './axios'
import endpoints from '../config/endpoints'

export default async (caseId, token) => {
  const headers = {
    headers: {
      caseId,
      token
    }
  }
  try {
    const response = await axios.get(endpoints.GET_CHAT, headers)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}
