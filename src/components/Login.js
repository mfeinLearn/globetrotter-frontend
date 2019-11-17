//code for Login.js

// this is a functional component
import React from 'react'
import { connect } from 'react-redux'
// this makes the action creator
import { updateLoginForm } from "../actions/loginForm.js"// I now have this action creator availible which is availible to be able to pass through connect
import { login } from "../actions/currentUser.js"
//..

const Login = ({ loginFormData, updateLoginForm, login, history }) => {// the updateLoginForm that comes from props is not the same as the one that was inported it is a beefed up reduxed version of that function. now I can use it as my callback on my onChange
// THIS IS THE UPDATING FORM HANDLER
  const handleInputChange = event => {
    const { name, value } = event.target
    const updatedFormInfo = {
      ...loginFormData,
      [name]: value
    }
    updateLoginForm(updatedFormInfo)// dispatching my updateLoginForm directly from here
  }
  // the following will occur when I successfully login 
  const handleSubmit = event => {
    event.preventDefault()
    login(loginFormData, history)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="username" value={loginFormData.username} name="username" type="text"
      onChange={handleInputChange}/>
      <input placeholder="password" value={loginFormData.password} name="password" type="text"
      onChange={handleInputChange}/>
      <input type="submit" value="Log In"/>
    </form>
  )
}
// with mapStateToProps I can get the state from the store but that
//.. does not do me any good unless

// What am I going to do with mapStateToProps? what does the following give me?:
//    username: state.loginForm.username,
//    password: state.loginForm.password
//
// mapStateToProps is only read only this is what I am pulling from whatever already in the store.
// mapStateToProps - gives us access to the chuncks of state from the store as props
// How does props gets pass into a component, wheather it is a class or a functional component?
//..

// props gets passed to a functional component as what?
//.. an argument and as an object( I am getting an object which I can call
// whatever I want as an argument )

// we are taking state from redux
//.. "we are saying redux I need these chunks of state from the store"



// this gives me an argument coming to this component that looks like this:
// {
//   username: "cpdun",
//   password: "passwo"
// }
const mapStateToProps = state => {// getting this state from the store
  return {
    loginFormData: state.loginForm
  }
}

// I got the username and the password from the store
//.. how do I then how do I get the ability to change these things?
// 1. import my action creator

export default connect(mapStateToProps, { updateLoginForm, login } )(Login)
// the object that gets passed to connect is one of the options
//.. to dispatch to props. This object has a key of whatever I want to call this object inside of
//.. my component. The value of this needs to be pointing to an action creator.
//.. when the key and the value are the same I can use the simplified syntax.

// so the updateLoginForm simply gets passed into connect which gives me what now
//.. how do i get availiblility of the updateLoginForm inside my component?





// in <input/>:
// what do we need to keep track of this
// when we change things? name

// how can we going to connect these things to redux

// connect:
// connect is a function that takes up to four arguments (we ususually deal with the first two)
//.. it returns a function that takes a component and returns a componet

//// Before I have access to the login action creator how do I finish the connect?
// pass it mapDispatchToProps login. login is an action creator.
//.. when I have thunk redux knows even if login(action creator) is returning a function it knows what to do by this action creator
//.. it knows what to do. Redux is like ohh its a function now that I have thunk ill give you dispatch and let you do your thing.
/////////////////////////
// Looking at the props of Login history is a top level prop which I can
