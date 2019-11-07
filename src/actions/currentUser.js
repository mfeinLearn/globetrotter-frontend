// synchronous action creators
export const setCurrentUser = user => {
  return {
    type: "SET_CURRENT_USER",
    user
  }
}

export const clearCurrentUser = () => {
  return {
    type: "CLEAR_CURRENT_USER"
  }
}
// asynchronus action creators
// action creator called login

export const logout = () => {// what does thunk give us?
  // what data structure am I returning now from a async
  //.. action creator using thunk? a function
  return dispatch => {
    dispatch(clearCurrentUser())
    return fetch('http://localhost:3001/api/v1/logout', {
      credentials: "include",
      method: "DELETE"
    })
  }
}

export const login = credentials => {
  console.log("credentials are", credentials)
  return dispatch => {
    return fetch("http://localhost:3001/api/v1/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
    .then(r => r.json())
    .then(user => {
      if (user.error) {
        alert(user.error)
      } else {
        dispatch(setCurrentUser(user)) // this dispatches an actoin
      }
    })
    .catch(console.log)
  }
}// this returns a function and a function recieves what as an argument - dispatch
// I am returning a function expression in this case an arrow function YOU can also use the keyword function
//.. that function now returns a fetch and with in this fetch I can dispatch as I see fit.
//** REDUX IS GOING TO GIVE ME dispatch AND I CAN USE IT AS I SEE FIT.



// I expect this action creator to recieve as an argument a user object
//.. which would then take the place of the second argumet in this returning action

// in order to set a current user I need to make a request to the backend

//**//
// login is the action creator that I need for now I have already built my synchronous
//.. action set current user but that does not get fired until this asynchronus action
//.. Q: so how can I get the information how do I connect login with the loginform?
//

export const getCurrentUser = () => {
  console.log("DISPATCHING GET CURRENT USER")
  return dispatch => {
    return fetch("http://localhost:3001/api/v1/get_current_user", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(r => r.json())
    .then(user => {
      if (user.error) {
        alert(user.error)
      } else {
        dispatch(setCurrentUser(user)) // this dispatches an actoin
      }
    })
    .catch(console.log)
  }
}
