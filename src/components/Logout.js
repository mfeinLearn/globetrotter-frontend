//This component is to logout!

import React from 'react'
import { connect } from 'react-redux'
import { logout } from "../actions/currentUser.js"
import { withRouter } from 'react-router-dom'//withRouter - is a function that will inject router props to what ever component I choose


const Logout = ({ logout, history }) => {
  return (
    <form onSubmit={(event) => {
      event.preventDefault()
      logout()
      history.push('/')
      }
    }>
      <input type="submit" value="Log Out"/>
    </form>
  )
}

export default withRouter(connect(null, { logout } )(Logout))

// I still need...

// 1. action (creator)
//  -  2 action creators?

// 2. another case statement in my currentUser reducer
