import axios from './axios'
import endpoints from '../config/endpoints'

export default async (token, imageId, caseId) => {
  const headers = {
    headers: {
      token,
      imageId,
      caseId
    }
  }
  try {
    const response = await axios.get(endpoints.GET_IMAGE, headers)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}
