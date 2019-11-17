const initialState = {
  name: "",
  startDate: "",
  endDate: ""
}

export default (state=initialState, action) => {
  //console.log("IN THE REDUCERRRRRRRRR", action)
  switch (action.type) {
    case "UPDATE_NEW_TRIP_FORM":
      const returnVal = {
        ...state,
        [action.formData.name]: action.formData.value
      }
      console.log("return value is", returnVal)
      return returnVal
    case "RESET_NEW_TRIP_FORM":
      return initialState
    case "SET_FORM_DATA_FOR_EDIT":
      return action.tripFormData
    default:
      return state
  }
}
