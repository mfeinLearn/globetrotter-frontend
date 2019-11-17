// parent container that is going to render some other stuff
import React from 'react'
//import TripCard from './TripCard.js'// ya have a parent that renders a bunch of children // dont need anymore
import { connect } from 'react-redux' // I want to  tap into the redux store
import { Link } from 'react-router-dom'

// MyTrips is a functional container component
// MyTrips is going to be responseble for rendering or showing
//.. a bunch of indivisual trip components
const MyTrips = props => {
  // I have access to trips now from props.trips in mapStateToProps and connectting
  const tripCards = props.trips.length > 0 ?
    props.trips.map(t => (<p key={t.id}><Link to={`/trips/${t.id }`}>{t.attributes.name}</Link></p>)) :
    null

  return (
  //tripCards.length > 0 ? tripCards : null
     tripCards
  )
}
// Do I need any piece of the state or a subset of the state and any
//.. chunk of information from the state in this paticular component MyTrips?
//.. that is a question that is either a yes or a no
  //.. if yes
    //.. need mapStateToProps
  //.. if no
    //.. dont need mapStateToProps

// we provide mapStateToProps to Redux in order to tell Redux:
// "Excuse me Redux, would you please provide use access to your state
// so that we may pick and choose the pieces of state we would like availible
// to this particular component as props."

const mapStateToProps = state => {
  return { // return an object whose keys( trips: ) are whatever I want availible to me as props
          //.. since what we want is from the store it(myTrips) needs to be called exactly what it is in the store
          // left side(the key trips:) - is what I actually want to call inside this component
    trips: state.myTrips
  }
}

// I pass in mapStateToProps and mapStateToProps to the connect function
//.. I dont need any actions right now so I dont need mapStateToProps
export default connect(mapStateToProps)(MyTrips)
// connect is a function that returns a function. the connect function takes in the mapStateToProps function as a callback
//
// mapStateToProps tells redux these are the pieces of state I need
// mapDispatchToProps these are the action creators I am giving you
//.. the functionality I need. This (connect(mapStateToProps)) returns a
//.. function. Which recieves MyTrips as an argument which is:
// const MyTrips = () => { return ( ) }
// What I am exporting is not only MyTrips but also a bulked up version of
// MyTrips that has extra props based on what I told Redux I need


/*
The steps to tap into redux:
  Step 1.
    grab connect from react-redux

  step 2: // what I want to do explicitly is get that array of MyTrips from the state
    build a function called mapStateToProps that recieves the state of the store as an argument.
    mapStateToProps needs to return a paticular datatype
    What datatype that I return from mapStateToProps? an object

  step 3:
    In order to get these trips availible as props to this component I need to use connect (is a function that returns a function
  which is a high order function)

*/


/*
const mapStateToProps = ({ myTrip }) => { // if I want and I know exactly what I want from the state
  // I can destructure my argument
  return {
    myTrips
  }
}
*/
/*
mapStateToProps gives us access to pieces of the state
what ever pieces of state I need over here I can now grab with mapStateToProps
*/
/*

*/
