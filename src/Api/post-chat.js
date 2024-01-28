import axios from './axios'
import endpoints from '../config/endpoints'

export default async (currChatId, currChannelId, type, origin, content, token) => {
  const body = {
    currChatId,
    currChannelId,
    type,
    origin,
    content,
    token
  }
  try {
    const response = await axios.post(endpoints.POST_CHAT, body)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}
