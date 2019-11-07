import React from 'react';
import './App.css';
import Login from "./components/Login.js"
import Logout from "./components/Logout.js"
import { connect } from 'react-redux'
import { getCurrentUser } from "./actions/currentUser.js"

class App extends React.Component {

  // every time the Component mount so every time the component mounts
  //.. this app I'm going to send a request and say hey is there anyone logged in
  componentDidMount() {
    this.props.getCurrentUser()
  }

  render(){
    return (
      // think about refactoring this to a nav bar 
      this.props.currentUser ? <Logout/> : <Login/>
    );

  }
}

// I can do this because I know the incoming argumet is an object, state,
// coming from redux
//and I know it has a property called currentUser
// state = { ...,
// currentUser: {...}
// }

const mapStateToProps = ({ currentUser }) => {// state is the state of the redux store
  return {
    currentUser // is what is called in the redux store
  }
}

export default connect(mapStateToProps, {getCurrentUser})(App);
// how do I connect App with the actual currenty users state?

// we have already maped dispatch to props to get the current user what makes a change to the state that loads the currenty user
//.. so How do we actually then get that user to get currentUser to get current user into the redux store -> we need to use mapStateToProps
