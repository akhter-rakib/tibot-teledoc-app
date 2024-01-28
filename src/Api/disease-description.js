import axios from './axios'
import endpoints from '../config/endpoints'

export default async (token, diseaseName) => {
  const headers = {
    headers: {
      token,
      diseaseName
    }
  }
  try {
    const response = await axios.get(endpoints.DISEASE_DESCRIPTION, headers)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}
