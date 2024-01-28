const uiReducerDefaults = {
  isReactMenuOpen: false,
  userEmail: '',
  doctorName: '',
  unreadMessageCount: 0
}

export default (state = uiReducerDefaults, action) => {
  switch (action.type) {
    case 'SET_REACT_MENU':
      return {
        ...state,
        isReactMenuOpen: action.payload
      }
    case 'SET_USER_EMAIL':
      return {
        ...state,
        userEmail: action.payload
      }
    case 'SET_DOCTOR_NAME':
      return {
        ...state,
        doctorName: action.payload
      }
    case 'SET_UNREAD_MESSAGE_COUNT':
      return {
        ...state,
        unreadMessageCount: action.payload
      }
    default:
      return state
  }
}
