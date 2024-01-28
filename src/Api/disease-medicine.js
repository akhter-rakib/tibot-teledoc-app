import axios from './axios'
import endpoints from '../config/endpoints'

export default async (token, diseaseName, caseId) => {
  const headers = {
    headers: {
      token,
      diseaseName,
      caseId
    }
  }
  try {
    const response = await axios.get(endpoints.DISEASE_MEDICINE, headers)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}
