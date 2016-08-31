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

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Suscribe to changes
var unsubscribe = store.subscribe(() => {
  var state = store.getState();
  console.log("Current state", state);
});

store.dispatch(
  {
    type: "CHANGE_SEARCH_TEXT",
    searchText: "text to search"
  }
);

store.dispatch(
  {
    type: "CHANGE_SEARCH_TEXT",
    searchText: "my text"
  }
);

unsubscribe();

store.dispatch(
  {
    type: "CHANGE_SEARCH_TEXT",
    searchText: "Not shown text"
  }
);
