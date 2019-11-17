// This is a stateless component
import React from 'react';
import Login from './Login.js';
import Signup from './Signup.js';
import { Link } from 'react-router-dom'
//NavLink - are great for nav bars when
//.. you are going to see those links all times
// Link - is a one time thing
const Home = ({}) => (
  <div>
    <span>
      <Link to="/signup">Sign Up</Link> or <Link to="/login">Log In</Link>
    </span>
  </div>
);

export default Home;
