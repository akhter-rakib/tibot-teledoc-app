import config from '../config/config'
export default (imagePath) => {
  return imagePath.split(config.API_ROOT + '/image/')[1]
}
