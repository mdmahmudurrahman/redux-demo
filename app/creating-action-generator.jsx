var redux = require('redux');
var axios = require("axios");
console.log('Starting redux example');

var actions = require("./actions/index");
var store = require("./store/configureStore").configure();

// register all the reducers

// The combineReducers helper function turns an object whose values are
// different reducing functions into a single reducing function you can pass
// to createStore.
//
// The resulting reducer calls every child reducer, and gathers their results
// into a single state object. The shape of the state object matches the keys
// of the passed reducers.


// Subscribe to changes
var unsubscribe = store.subscribe(() => {
  var state = store.getState();
  console.log("New state:", store.getState());
  if(state.map.isFetching){
    document.getElementById("app").innerHTML = "Loading.....";
  }
  else if (state.map.url){
    document.getElementById("app").innerHTML = '<a href="' + state.map.url + '" target="_blank">View your location</a>';
  }
});
// unsubscribe();

store.dispatch(actions.fetchLocation());
store.dispatch(actions.changeName("Andrew"));
store.dispatch(actions.addHobby("Running"));
store.dispatch(actions.addHobby("Playing cricket"));

// remove from hobby array
store.dispatch(actions.removeHobby(2));

store.dispatch(actions.changeName("Emily"));
// add movie
store.dispatch(actions.addMovie("Storm in the..", "some one"));
store.dispatch(actions.addMovie("Mad Max", "actttttt"));
store.dispatch(actions.addMovie("Prince of Pharsia", "Shakil-fg"));

// remove movie from the array
store.dispatch(actions.removeMovie(3));
