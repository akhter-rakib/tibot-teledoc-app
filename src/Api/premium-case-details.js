import axios from './axios'
import endpoints from '../config/endpoints'

export default async (token, caseId) => {
  const premiumCaseDetailsHeaders = {
    headers: {
      token,
      caseId
    }
  }
  try {
    const response = await axios.get(endpoints.PREMIUM_CASE_DETAILS, premiumCaseDetailsHeaders)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}
