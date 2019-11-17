import { resetTripForm } from './tripForm'

// synchronous action creators
export const setMyTrips = trips => {
  return {
    type: "SET_MY_TRIPS",
    trips
  }
}

export const clearTrips = () => {
  return {
    type: "CLEAR_TRIPS"
  }
}

export const addTrip = trip => {
  return {
    type: "ADD_TRIP",
    trip
  }
}

export const updateTripSuccess = trip => {
  // we have gotten that trip back
  return {
    type: "UPDATE_TRIP",
    trip // this is the trip with all of its new data
  }
}

// async actions

export const getMyTrips = () => {
  return dispatch => {
    return fetch("http://localhost:3001/api/v1/trips", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then(r => r.json())
    .then(response => {
      if (response.error) {
        alert(response.error)
      } else {
        console.log(response.data)
        dispatch(setMyTrips(response.data))
      }
    })
    .catch(console.log)
  }
}

// this is an async action creator meaning
//.. I need to wait for something to happen in order to update my store.
export const createTrip = (tripData, history) => {
  //.. what am i going to return from an async action creator?
  //.. a function. What does that function very often? return
  return dispatch => {// this is a functional component that I am returning
    const sendableTripData = {
      start_date: tripData.startDate,
      end_date: tripData.endDate,
      name: tripData.name,
      user_id: tripData.userId
    }
    return fetch("http://localhost:3001/api/v1/trips", {
      credentials: "include",// NOT part of the headers
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sendableTripData)
    })
      .then(r => r.json())
      .then(resp => {
        if (resp.error) {
          alert(resp.error)
        } else {
          // VVV I am adding trip to the redux store
          dispatch(addTrip(resp.data)) //-> I get that action by invocking my action creaator with the informatoin that it needs and that returns to me the object that I am actually dispatching which would trigger or invoke all of my reducers the one that I am going to catch on is case "ADD_TRIP" (look in myTrips reducer) where I will just concat that new trip to my state. This paticular state reffers to just the state of myTrips when I export this reducer function (in store) I use it in my store I add something called myTrips
          //*** The reducer located in reducers/myTrips.js handles that paticular piece of the redux state so it is just an array that is all that I need to return here
          dispatch(resetTripForm()) // <-- I am dispatching to clear the form
          history.push(`/trips/${resp.data.id}`)// <-- I am going some place else
          //go somewhere else --> trip show?
          //add the new trip to the store
        }
      })
      .catch(console.log)
  }
}
// the restful convention to where we send this informtoio:
// is post to trips


export const updateTrip = (tripData, history) => {
  // sending the fetch request
  return dispatch => {
    const sendableTripData = {
      start_date: tripData.startDate,
      end_date: tripData.endDate,
      name: tripData.name
    }
    return fetch(`http://localhost:3001/api/v1/trips/${tripData.tripId}`, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sendableTripData)
    })
      .then(r => r.json())
      .then(resp => {
        if (resp.error) {
          alert(resp.error)
        } else {
          dispatch(updateTripSuccess(resp.data))// this will update the store
          // dispatch(resetTripForm())
          history.push(`/trips/${resp.data.id}`)
        }
      })
      .catch(console.log)
  }
}

// updateTripSuccess which is dispatched on success with the data
//.. coming back from the back end which is that trip object(the serilized trip object)
//.. that is captured in this very specific varable trip ( as seen below VVV)
/*
export const updateTripSuccess = trip => {
  // we have gotten that trip back
  return {
    type: "UPDATE_TRIP",
    trip // this is the trip with all of its new data
  }
}
*/
