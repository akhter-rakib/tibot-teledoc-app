import axios from './axios'
import endpoints from '../config/endpoints'

export default async (currChatId, token) => {
  const body = {
    currChatId,
    token
  }
  try {
    const response = await axios.post(endpoints.CLAIM_CASE, body)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}
