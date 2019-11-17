// this is a functional component
import React from 'react'
import { connect } from 'react-redux'
// this makes the action creator
import { updateSignupForm } from "../actions/signupForm.js"
import { signup } from "../actions/currentUser.js"
//..

// grab it here as a prop
const Signup = ({ signupFormData, updateSignupForm, signup, history }) => {
// THIS IS THE UPDATING FORM HANDLER
// this ____ is code that handle basically any name and value in any form as long as my name is approperatly
//.. written
  const handleUserInfoInputChange = event => {
    const { name, value } = event.target
    const updatedFormInfo = {
      ...signupFormData,
      [name]: value
    }
    updateSignupForm(updatedFormInfo)
  }

  const handleHomeTownInfoInputChange = event => {
    const { name, value } = event.target
    const updatedFormInfo = {
      ...signupFormData,
      hometown: {
        ...signupFormData.hometown,
      [name]: value
      }
    }
    updateSignupForm(updatedFormInfo)
  }

  const handleSubmit = event => {
    event.preventDefault()
    signup(signupFormData, history)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="name" value={signupFormData.name} name="name" type="text"
      onChange={handleUserInfoInputChange}/>
      <input placeholder="username" value={signupFormData.username} name="username" type="text"
      onChange={handleUserInfoInputChange}/>
      <input placeholder="password" value={signupFormData.password} name="password" type="text"
      onChange={handleUserInfoInputChange}/>
      <input placeholder="city" value={signupFormData.hometown.city} name="city" type="text"
      onChange={handleHomeTownInfoInputChange}/>
      <input placeholder="state" value={signupFormData.hometown.state} name="state" type="text"
      onChange={handleHomeTownInfoInputChange}/>
      <input placeholder="country" value={signupFormData.hometown.country} name="country" type="text"
      onChange={handleHomeTownInfoInputChange}/>
      <input type="submit" value="Sign Up"/>
    </form>
  )
}

const mapStateToProps = state => {
  return {
    signupFormData: state.signupForm
  }
}

// grabing it from redux
export default connect(mapStateToProps, { updateSignupForm, signup } )(Signup)

/*
const updatedFormInfo = {
  ...signupFormData,
  [name]: value
}
 - this code will update the top level keys for
 ..signupFormData and which ever name this is wheather it is
 name, username, password, hometown and its corrisponding value
*/
