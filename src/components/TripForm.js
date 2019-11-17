import React from 'react';
// 1.   VVV we first grab the action creator
import { updateTripForm } from "../actions/tripForm.js"
import { connect } from 'react-redux'

// 3. This means Redux gives us back a prop called updateTripForm
// which when invoked, actually Redux will now dispatch
const TripForm = ({formData, updateTripForm, userId, trip, handleSubmit, editMode}) => { // add history because this is going to be a form submittion // destructuring
  // I want to update the url if I successfully create a new trip
  const { name, startDate, endDate } = formData

  const handleChange = event => {
    console.log("trigger handle change")
    const { name, value } = event.target
    // 4. This is not an invocation of just the action creator,
    // it's now Redux dispatching the action built by the actions
    // creator with the appropriate argumets
    updateTripForm(name, value)// - redux will be dispatching for us -  // when updateTripForm gets dispatched by redux dispatch function go to action creator(updateTripForm)
    // updateTripForm - this is firing but we want to
    //.. give this function to redux
    // saying = "here redux you call this when it needs to be called "
    // it is what we are telling redux to dispatch for us as an action
  }


// this is a controlled inputs - we are grabbing the values from redux and we are showing them imiditlly
  return (
    <form onSubmit={event => {
      //console.log("here we are!!")
      event.preventDefault()
      handleSubmit(formData)
    }}>
      <input
        placeholder="name"
        name="name"
        onChange={handleChange}
        value={name}
      /><br/>
      <input
        placeholder="start date"
        name="startDate"
        onChange={handleChange}
        value={startDate}
      /><br/>
      <input
        placeholder="end date"
        name="endDate"
        onChange={handleChange}
        value={endDate}
      /><br/>
      <input
        type="submit"
        value={editMode ? "Update Trip" : "Create Trip"}
      />
    </form>
)};

// TripForm is grabbing the form data from redux and the userId from redux
const mapStateToProps = state => {
  // When @INIT fired their is not currentUser no matter we are logged in or not
  const userId = state.currentUser ? state.currentUser.id : ""
  return {
    // what piece(s) of state do I need?
    formData: state.tripForm,
    userId
  }// now these are availible to us as props in my component
  //.. once i pass in mapStateToProps to connect
}

// 2. We pass the action creator to redux's connect function
//.. using either mapDispatchToProps or the shorthand object syntax seen below.
export default connect(mapStateToProps, { updateTripForm })(TripForm);

/////// // NOTE:
// to properly call updateTripForm in redux we have to destructure it
//.. in our component. If we dont react will call the fuction that we imported which
//.. is what we dont want to do!!!!
// The updateTripForm function that I want to invock is the updateTripForm that I get
//..from redux as props.
//.. when I pass this thing along I am giving this(updateTripForm) to redux in:
//..
//.. export default connect(mapStateToProps, { updateTripForm })(TripForm);
//.. and I am saying "redux here is an action creator take this action creator and
//.. you know what to do" redux says-"I do?? oh! I do! you are right! I know when I take this thing and I am going to take
//.. dispatch and your store and all of the redux things and I am going to splash them together
//.. and I am going to give it back to you as a prop now and you told me you want to call it updateTripForm so that is
//.. is what I am going to call it for you as a prop . and now when you call that prop you have the power to actually
//.. dispatch that action creator ... redux says - Ill dispatch for you now when you apparently just invock this function"

// This: updateTripForm(name, value) is not the incokation of updateTripForm that we inported from
//.. /actions/TripForm.js BUT instead should be an incokation of the prop we get back as a result from the following:
//.. export default connect(mapStateToProps, { updateTripForm })(TripForm);

// I am telling redux:
// export default connect(mapStateToProps, { updateTripForm })(TripForm);
//.. please take this action creator give it back to me as a prop and when I call it
//.. I want you to actually dispatch the action it returns

// JavaScript will always start and find the most local verson of what ever it is first and
//.. it will say excuse me handleChange do you have something scoped to you called updateTripForm? no
//.. then we go up the scope chain. Then we ask TripForm do you have something called
//.. updateTripForm? TripForm now says - YES! I do!

// An action creator is also allowed to return a function if we are using thunk

//NOTE: I want this to be controlled; Plus we are using redux so it needs to be controlled.
// I need this value specifically the name, startDate, and endDate to come from Redux. I am grabbing the
//.. formData from redux I am letting redux controll this and that is what I want.
