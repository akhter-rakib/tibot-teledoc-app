export default (pendingCases) => {
  return pendingCases.filter(item => item.isDoctorUnread).length
}
