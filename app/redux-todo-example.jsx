var redux = require("redux");

// -searchText
// -showComplete
// -todos

console.log("Redux tutorial");

var reducer = (state= {searchText: "", showComplete: false, todos: []}, action) => {
  return state;
}

var store = redux.createStore(reducer);

var currentState = store.getState();
console.log(currentState);
