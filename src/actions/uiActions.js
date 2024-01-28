export const setUserEmail = (email) => ({
  type: 'SET_USER_EMAIL',
  payload: email
})

export const setDoctorName = (name) => ({
  type: 'SET_DOCTOR_NAME',
  payload: name
})

export const setUnreadMessageCount = (count) => ({
  type: 'SET_UNREAD_MESSAGE_COUNT',
  payload: count
})
