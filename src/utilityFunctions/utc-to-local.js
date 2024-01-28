import moment from 'moment'

export default (utcString) => {
  return moment.utc(utcString).local().format('ll (hh:mm A)')
}
