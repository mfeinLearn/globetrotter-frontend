import React from 'react';
import TripForm from './TripForm'
import { createTrip } from "../actions/myTrips.js"
import { connect } from 'react-redux'
// we need connect because we need the createTrip action

const NewTripFromWrapper = ({ history, createTrip }) => {

  const handleSubmit = ( formData, userId) => {
    // console.log("in handleSubmit, event is ", event)
    // do you have an action creator for adding trips
    createTrip({// now createTrip is able to do big things like do network request
      ...formData, //includes all of the information from the formData
      userId
    },history)
    // the object is going back to the backend

    // formData: {
    //   name: ""
    //   startDate: ""
    //   endDate: ""
    // }
  }
  return <TripForm history={history} handleSubmit={handleSubmit} />
};

export default connect(null,{ createTrip })(NewTripFromWrapper);
