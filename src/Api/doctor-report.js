import axios from './axios'
import endpoints from '../config/endpoints'

export default async (currChatId, doctorReport, token) => {
  const drReportBody = {
    currChatId,
    doctorReport,
    token
  }
  try {
    const response = await axios.post(endpoints.DOCTOR_REPORT, drReportBody)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}
