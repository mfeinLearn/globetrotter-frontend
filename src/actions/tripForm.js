// sync actions

// redux dispatch function will take the action({type: "UPDATE_NEW_TRIP_FORM",formData})
//.. and it will invock every reducer I have and pass this action ({type: "UPDATE_NEW_TRIP_FORM",formData})
//.. along. when any paticular reducer is invocked we switch on action.type we go through case by case if
//.. the case does not match then we just hit the default on each one if that happens redux knows
//.. that it does not need to tell the components to rerender for which everone that relay on that state.
// When we do match a case statement then we will actually return something else. so when a reducer returns something
//.. other then what it was before something other then the state THEN that is a change inthe store redux says - "
//.. ohh that is a change and it replaces the old state with the new state for that paticular piece of the store "
// in this case just to be clear - go to store.js

// updateTripForm - only updates a little piece at a time
export const updateTripForm = (name, value) => {
  const formData = { name, value }
  //console.log("formData in the action creator", formData)
  return {
    type: "UPDATE_NEW_TRIP_FORM",
    formData
  }
}
// checking to see formData object

export const resetTripForm = () => {
  return {
    type: "RESET_NEW_TRIP_FORM",

  }
}

// updates the whole form
//.. since I gave redux controll over my form it is redux that I need to tell.
export const setFormDataForEdit = trip => {
  const tripFormData = {
    name: trip.attributes.name,
    startDate: trip.attributes.start_date,
    endDate: trip.attributes.end_date
  }
  return {
    type: "SET_FORM_DATA_FOR_EDIT",
    tripFormData
  }
}
