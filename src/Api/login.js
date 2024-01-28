import axios from './axios'
import endpoints from '../config/endpoints'

export default async (email, password) => {
  const loginBody = {
    email,
    password
  }
  try {
    const response = await axios.post(endpoints.REGISTERED_DOCTOR_LOGIN, loginBody)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}
