var redux = require("redux");
var thunk = require("redux-thunk").default; // to pull the default property we use default
// loading reducers
var {nameReducer, hobbiesReducer, moviesReducer, mapReducer} = require("./../reducers/index");


export var configure = () => {
  var reducer = redux.combineReducers({
    name: nameReducer,
    hobbies: hobbiesReducer,
    movies: moviesReducer,
    map: mapReducer
  });

  var store = redux.createStore(reducer, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
// this middleware teaches redux how to work with actions that are objects
  return store;
}
