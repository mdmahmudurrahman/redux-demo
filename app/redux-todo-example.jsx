var redux = require("redux");

// -searchText
// -showComplete
// -todos

console.log("Redux tutorial");

var reducer = (state= {searchText: "", showComplete: false, todos: []}, action) => {
  switch (action.type) {
    case "CHANGE_SEARCH_TEXT":
      return {
        ...state,
        searchText: action.searchText
      };
      default:
        return state;
    }
 };

var store = redux.createStore(reducer);
console.log("Current state", store.getState());
store.dispatch(
  {
    type: "CHANGE_SEARCH_TEXT",
    searchText: "text to search"
  }
);

console.log("changed state", store.getState());
