import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
// import usersReducer from './reducers/users.js'
import currentUser from './reducers/currentUser.js'
import loginForm from './reducers/loginForm.js'
import myTrips from './reducers/myTrips.js'
import signupForm from './reducers/signupForm.js'
import tripForm from './reducers/tripForm.js'
import thunk from 'redux-thunk'
// we can name the reducers what ever we want after we import them

//just displaying different syntax options here (lines 8 and 9)
// below is the name of the properties in the store(which we made up)
const reducer = combineReducers({// these will be the keys in my redux store
  // users: usersReducer,
  //currentUser: currentUser
  // property name: reducer (which is a function)
  currentUser,
  loginForm,
  myTrips,
  signupForm,
  tripForm
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store
//// NOTE:
// I am importing TripForm in this file as a reducer I am inserting
//.. it into my redux store which is why we have it in redux (check in redux)
//.. and when we actually make this change what ever the piece of state(in TripForm)
//.. that I change now replaces this  (in this file TripForm) state and then redux tells react
//.. hey you you you and you relay on this piece of information it just changed you might want to
//.. rerender
