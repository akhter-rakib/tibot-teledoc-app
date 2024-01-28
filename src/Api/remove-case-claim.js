import axios from './axios'
import endpoints from '../config/endpoints'

export default async (currChatId, token) => {
  const loginBody = {
    currChatId,
    token
  }
  try {
    const response = await axios.post(endpoints.REMOVE_CASE_CLAIM, loginBody)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}
