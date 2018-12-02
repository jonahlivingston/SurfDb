import axios from 'axios'

const reducer = (state=null, action) => {
  switch (action.type) {
  case AUTHENTICATED:
    return action.user
  }
  return state
}

const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED, user
})

// export const login = (email, password) =>
//   dispatch =>
//     axios.post('/api/auth/login/local',
//       {username, password})
//       .then(() => dispatch(whoami()))
//       .catch(() => dispatch(whoami()))

export const signup = (username, password) => {
  return (dispatch) => {
    console.log(username, password)
    axios.post('/api/auth/newsignup', {username, password})
  }
}

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)))

export const login = (email, password) => {
  return (dispatch) =>{
    console.log(email, password)
    axios.post('/api/auth/newlogin', {email, password})
  }
}

export default reducer
