export const addToken = (token) => ({
  type: 'ADD_TOKEN',
  payload: token
})

export const setIsAuthenticated = (isAuthenticated) => ({
  type: 'SET_IS_AUTHENTICATED',
  payload: isAuthenticated
})

export const setIsAdmin = (isAdmin) => ({
  type: 'SET_IS_ADMIN',
  payload: isAdmin
})
