import React from 'react';
import TripForm from './TripForm'
import { updateTrip } from "../actions/myTrips.js"
import { setFormDataForEdit, resetTripForm } from "../actions/tripForm.js"
import { connect } from 'react-redux'

class EditTripFromWrapper extends React.Component {
// if the component is already mounted and you update sometype of state and
//.. go to the url of the edit page the content will not be in the form
//.. which is why we need another life cycle method for when we update data on the form

  componentDidMount(){
    this.props.trip && this.props.setFormDataForEdit(this.props.trip)
  }

  componentDidUpdate(prevProps){
    //his.props.trip needs to exist and it was not there before
    this.props.trip && !prevProps.trip && this.props.setFormDataForEdit(this.props.trip)
  }

  componentWillUnmount(){
    // when this thing unmounts I want to clear that form
    //.. I am not connected to the clear form action right now
    this.props.resetTripForm()
  }

  handleSubmit = (formData) => {
    // console.log("HERE WE ARE")
    const { updateTrip, trip, history } = this.props
    // console.log("in handleSubmit, event is ", event)
    updateTrip({
      ...formData,
      tripId: trip.id
    },history)
  }

  render() {
    const {history, handleSubmit} = this.props
    return <TripForm editMode handleSubmit={this.handleSubmit} />
  }
};

export default connect(null,{ updateTrip, setFormDataForEdit, resetTripForm })(EditTripFromWrapper);
/*
the following is tripData
 =>
{...formData,
  tripId: trip.id,
  userId }

*/

// I still have history as a prop because EditTripFromWrapper was rendered directly from a route which means it
// it has access to my history prop as long I have provided it as such.
// LOOK AT APP.JS
// When I rendered edit trip form wrapper I use render method to do so
//.. I return my component and when I did I grab props. These props hold all of the incomming props that will
//.. automatically be passed down by route and I just grabbed them all by spread operating and wrapping it
//.. in an object and that gives me all of my props including history so I do have it abailible

// In code how can I tell react and tell redux
// .. that aa change happened on the edit form and I am not any more so the inputs needs to clear.
//ex: when you want to edit a trip (go to the trip and press edit) and then instead decided to create a new trip
//.. we expect the form is empty

// If formData lived in TripForm when ever trip form where to unmount then
//.. it would then clear out. But I am storing my formData in redux. soooo...
// I need to explictly find where I need to make a change and in this case I am trying to clear the form
// if we leave the myTrips Wrapper and their is a life cycle method for leaving a component or unmounting it.

//Unmounting:
//.. unmounting will happen on a successful trip update
//.. (look at the action creator that makes this happen VVV is an indecation of success)
// {
//   dispatch(updateTripSuccess(resp.data))// this will update the store
//   dispatch(resetTripForm())
//   history.push(`/trips/${resp.data.id}`)
// }
//.. on sucess I push(history.push(`/trips/${resp.data.id}`)) someplace else which
//.. causes (go to App.js this acts like our controller ). App will now route to a new page.
//.. When it does that it is gonig to catch this guy:
// <Route exact path='/trips/:id' render={props => {
//     // I need to get ???
//     const trip = trips.find(trip => trip.id === props.match.params.id)//I need to match the trip to the id!
//     console.log(trip)
//     return <TripCard trip={trip} {...props}/>
//   }
// }/>
// and our old friend EditTripFormWrapper will unmount meaning that it is going to fire off the componentWillUnmount lifecycle method
// which will clear out our trip form for us
