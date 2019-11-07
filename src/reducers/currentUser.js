export default (state = null, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return action.user// return the user object in its entirety
    case "CLEAR_CURRENT_USER":
      return null
    default:
      return state
  }
}
