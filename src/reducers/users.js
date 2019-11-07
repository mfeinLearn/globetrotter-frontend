// const initialState = { key: whatever, slfkdjslkfjl}
// export default (state = initialState, action) => {

export default (state = [], action) => {
  switch (action.type) {
    default:
      return state
  }
}

// the reducer
// the state's default should be an empty version of what ever
// this paticular reducer is responcible for returning. If this
// my users reducer

// when will this default argument use the default?
//.. When the initial action(@@INIT) gets fired (looking back in redux)
//.. it is going to return the default state of all of your reducers
//
// Because this is a default export I
//.. can name it what ever I want (usersReducer) from './actions/users.js' when I
//.. pass this object I am going to declare a key of user. That key of user
//.. is what will show up in my store and point it to my usersReducer
