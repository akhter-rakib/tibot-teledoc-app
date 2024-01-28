import axios from './axios'
import endpoints from '../config/endpoints'

export default async (currChatId, imageFile, token) => {
  const imageUploadFormData = new FormData()
  imageUploadFormData.set('currChatId', currChatId)
  imageUploadFormData.set('imageFile', imageFile)
  imageUploadFormData.set('token', token)

  try {
    const response = await axios.post(endpoints.UPLOAD_IMAGE, imageUploadFormData)
    return response
  } catch (error) {
    throw new Error(error)
  }
}
