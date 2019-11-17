// this is the state of my trips

// NOTE: The reducer is where the change ACTUALLY happens!!!!!!
//.. I actually have to fire a reducer hereLOL
// ALWAYS UPDATE YOUR REDUCER TO MAKE A CHANGE
export default (state = [], action) => {
  switch (action.type) {
    case "SET_MY_TRIPS":
      return action.trips
    case "ADD_TRIP":
      return state.concat(action.trip)
    case "UPDATE_TRIP":
      //console.log("in UPDATE TRIP action is", action)
      return state.map(trip => trip.id === action.trip.id ? action.trip : trip)
    case "CLEAR_TRIPS":
      return []
    default:
      return state
  }
}
// just firing an action will not do anything if you dont have

// the return value of this function will become the state under what property I am usign the reducer in.
//.. In this case it is myTrips
