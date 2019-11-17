import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import { getCurrentUser } from "./actions/currentUser.js"
import NavBar from './components/NavBar.js'
import Home from './components/Home.js'
import Login from './components/Login.js'
import Logout from './components/Logout.js'
import Signup from './components/Signup.js'
import MyTrips from './components/MyTrips.js'
import TripForm from './components/TripForm.js'
import TripCard from './components/TripCard.js'
import MainContainer from './components/MainContainer.js'
import NewTripFormWrapper from './components/NewTripFormWrapper.js'
import EditTripFormWrapper from './components/EditTripFormWrapper.js'
import { Route, Switch, withRouter, Link } from 'react-router-dom'
import { setFormDataForEdit } from './actions/tripForm.js'

// no {} if inport is an export default

class App extends React.Component {

  // every time the Component mount so every time the component mounts
  //.. this app I'm going to send a request and say hey is there anyone logged in
  componentDidMount() {
    this.props.getCurrentUser()
  }

  // I can grab setFormDataForEdit from props now because
  //.. I just connect it to redux
  render(){
    const { loggedIn, trips, setFormDataForEdit } = this.props // grab exactly the piece of that prop that I want
    return (
      <div className="App">
      {/*render =
        we can adjust the props that we get
        by using render.

        render={()=><Signup/>}
        - I am explictly saying dont give me any props and pass this thing along NAKED

        componet =
        if I just give the componet it will automatically
        pass along what ever props by default that was passed along
        */}
        {loggedIn ? <NavBar location={this.props.location}/> : <Home/>}
        <Switch>
          <Route exact path='/signup' render={({history})=><Signup history={history}/>}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/trips' component={MyTrips}/>
          {/*I am inplicitly passed the router props along when a route renders a component if I use the
            component= then the props that this thing would supply are automatically supply*/}
          <Route exact path='/trips/new' component={NewTripFormWrapper}/>
          <Route exact path='/trips/:id' render={props => {
              // I need to get ???
              const trip = trips.find(trip => trip.id === props.match.params.id)//I need to match the trip to the id!
              console.log(trip)
              return <TripCard trip={trip} {...props}/>
            }
          }/>
          <Route exact path='/trips/:id/edit' render={props => {
              // I need to get ???
              const trip = trips.find(trip => trip.id === props.match.params.id)//I need to match the trip to the id!
              //console.log(trip)
              return <EditTripFormWrapper trip={trip} {...props}/>
            }
          }/>
        </Switch>
      </div>
    );

  }
}

// component -Then route will automatically pass those props along to this component. I am getting them all because I am using this syntax pointing to component as a child of a route it is going to get those router props
// render -Then need to be more explicit about which route props I want to supply I can supply them all or I can pick and choose  //is selective in getting props


const mapStateToProps = state => {
  return ({
    // I NEED TO GET MORE STATE!!!!
    loggedIn: !!state.currentUser,
    trips: state.myTrips
  })
}


export default withRouter(connect(mapStateToProps, {getCurrentUser, setFormDataForEdit})(App));
// how do I connect App with the actual currenty users state?

// we have already maped dispatch to props to get the current user what makes a change to the state that loads the currenty user
//.. so How do we actually then get that user to get currentUser to get current user into the redux store -> we need to use mapStateToProps

// withRouter -
// adding withRouter gives you the following as props to App:
// 1. history
// 2. match
// 3. location
// With out withRouter we dont have access to

// **their is no router props with out withRouter being connected**
// BUT if you connect withRouter what that does it gives App those things as props which are:
// 1. history
// 2. match
// 3. location
// since a moment ago App did not have those as props those paticular props are what changed
//.. when I click on a Link and because those where not props going to App when most props changed even though
//.. it reflected in the url because the prop itself changed because it is not a prop not being supplied to App react does not consider
//.. app that something that needs to reload

// The router props are going to be given history, match, and location are going to be given to any children of a route
//.. automatically I can change that I can change that if I use render and I can explictly pick and choose the props that are going to be supplied
//.. but I was not giving App the router props and that is why I need with router withRouter then says (kind of like connect does with mapStateToProps
// and mapDispatchToProps geting us props from the react state and from the actions. so withRouter gives us those router props to a paticular component of
// it would not automatically get them ). Now that App has recieved those as props when they change now App is actually listing and changing along.
//--------
// NavLink problem solved: I explictly from app - before I render nav bar
//.. I am going to provide it with my location prop coming from my router props
//.. that I have with withRouter. when I do that it is going to make it so that
//.. the components inside of NavBar can see the version of where we are needs to
//.. see to make the comparison in order to collect information.
