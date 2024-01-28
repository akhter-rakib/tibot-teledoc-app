import moment from 'moment'

const getFormattedDate = (dateStr) => {
  return moment(dateStr)
}

export default (dateStr) => {
  const momentNow = moment()
  return moment.duration(momentNow.diff(getFormattedDate(dateStr))).humanize()
}
