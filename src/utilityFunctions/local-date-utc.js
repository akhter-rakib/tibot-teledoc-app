import moment from 'moment'

export default () => {
  var localDate = new Date()
  var momentTime = moment.utc(localDate).format()
  return momentTime
}
