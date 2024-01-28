import axios from 'axios'
import endpoints from '../config/endpoints'
import imageIdGenerator from './image-id-generator'

/**
 * @param {string} imageUrl
 * @param {object} headers
 * @returns {Promise<string>} blobUrl
 */

const authImageToBlob = async (imageUrl, headers, config={}) => {
  config = {
    ...config,
    responseType: 'blob',
    headers: headers }
  const res = await axios.get(imageUrl, config)
  const imageData = res.data
  return imageData
}

export const tibotAuthImageToBlob = async (imageUrl, token, caseId) => {
  return authImageToBlob(endpoints.GET_IMAGE, {
    token: token,
    imageId: imageIdGenerator(imageUrl),
    caseId: caseId
  })
} 

export const saveBlob = (function(){
  const a = document.createElement('a')
  document.body.appendChild(a)
  a.style.display = 'none'
  return function (blob, fileName) {
    if (!isDownloadSupported()) {
      window.alert(`Downloading is not supported in this browser.`)
      return
    }
    const urlCreator = window.URL || window.webkitURL
    const url = urlCreator.createObjectURL(blob)
    a.href = url
    a.download = fileName
    a.click()
    // removing from memory after downloading is done
    setTimeout(() => {
      urlCreator.revokeObjectURL(url)
    }, 10000);
  }
}())

const isDownloadSupported = () => {
  const a = document.createElement('a')
  if (a.download === undefined) {
    return false
  } else {
    return true
  }
}
