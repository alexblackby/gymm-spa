import store from '../store'

let auth = {}

auth.getToken = function () {
  return store.state.authData.token
}

auth.getUserId = function () {
  return store.state.authData.userId
}

auth.getUserEmail = function () {
  return store.state.authData.userEmail
}

auth.getAuthHeader = function () {
  return "Bearer " + auth.getToken()
}

export default auth
