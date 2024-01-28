const authReducerDefaults = {
  isAuthenticated: false,
  token: '',
  isAdmin: false
}

export default (state = authReducerDefaults, action) => {
  switch (action.type) {
    case 'ADD_TOKEN':
      return {
        ...state,
        token: action.payload
      }
    case 'SET_IS_AUTHENTICATED':
      return {
        ...state,
        isAuthenticated: action.payload
      }
    case 'SET_IS_ADMIN':
      return {
        ...state,
        isAdmin: action.payload
      }
    default:
      return state
  }
}
