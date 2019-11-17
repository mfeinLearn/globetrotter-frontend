//This component is to logout!

import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Logout from './Logout'
// use NavLink instead of link because that will give me the ability to style my links and know where
//.. I am at any given time


// because we are getting an object as an argument we can destructure it
const NavBar = ({ currentUser, loggedIn }) => { // we are going to pass in props which we can destructure
  return (
    <div className="NavBar">
      <NavLink exact activeClassName="active" to="/trips">My Trips</NavLink>
      <NavLink exact activeClassName="active" to="/trips/new">New Trip</NavLink>
      { loggedIn ? <><p id="loggedin">Logged in as {currentUser.attributes.name}</p><Logout/></> : null}
    </div>
  )
}

// I can do this because I know the incoming argumet is an object, state,
// coming from redux
//and I know it has a property called currentUser
// state = { ...,
// currentUser: {...}
// }

//mapStateToProps - this is how I connect to my redux store
const mapStateToProps = ({ currentUser }) => {// state is the state of the redux store
  return {
    currentUser, // is what is called in the redux store
    loggedIn: !!currentUser
  }
}

export default connect(mapStateToProps )(NavBar)
