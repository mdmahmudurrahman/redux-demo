var redux = require('redux');

console.log('Starting redux example');

// var stateDefault = {
//   name: "Anonymous",
//   hobbies: [],
//   movies: []
// }
var nextHobbyId = 1;
var nextMovieId = 1;

// var reducer = (state = stateDefault, action) => {
//   // state = state || {name: 'Anonymous'};
//
//   switch (action.type) {
//     case 'CHANGE_NAME':
//       return {
//         ...state,
//         name: action.name
//       }
//     case "ADD_HOBBY":
//       return {
//         ...state,
//         hobbies: [
//           ...state.hobbies,
//           {
//             id: nextHobbyId++,
//             hobby: action.hobby
//           }
//         ]
//       }
//     case "ADD_MOVIE":
//       return {
//         ...state,
//         movies: [
//           ...state.movies,  // grabbing current element in the movies
//           {
//             id: nextMovieId++,
//             title: action.title,
//             genre: action.genre
//           }
//         ]
//       }
//     case "REMOVE_HOBBY":
//       return {
//         ...state,
//         hobbies: state.hobbies.filter((hobby) => hobby.id !== action.id)
//       }
//     case "REMOVE_MOVIE":
//       return {
//         ...state,
//         movies: state.movies.filter((movie) => movie.id !== action.id)
//       }
//     default:
//       return state;
//   }
// };

var nameReducer = (state = "Shakil-fg", action) => {
  switch (action.type) {
    case "CHANGE_NAME":
      return action.name;
    default:
      return state;
  };
};

var hobbiesReducer = (state = [], action) => {
   switch (action.type) {
     case "ADD_HOBBY":
     return [
       ...state,
         {
           id: nextHobbyId++,
           hobby: action.hobby
         }
       ];
      case "REMOVE_HOBBY":
        return state.filter((hobby) => hobby.id !== action.id);
      default:
        return state;
  }
};

var moviesReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_MOVIE":
      return [
        ...state,
        {
          id: nextMovieId++,
          title: action.title,
          genre: action.genre
        }
      ];
    case "REMOVE_MOVIE":
      return state.filter((movie) => movie.id !== action.id)
      //here state is our movie array, no need to use state.movies.filter
    default:
      return state;
  }
};
// register all the reducers

// The combineReducers helper function turns an object whose values are
// different reducing functions into a single reducing function you can pass
// to createStore.
//
// The resulting reducer calls every child reducer, and gathers their results
// into a single state object. The shape of the state object matches the keys
// of the passed reducers.


var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: moviesReducer
});


var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Subscribe to changes
var unsubscribe = store.subscribe(() => {
  var state = store.getState();

  console.log("New state:", store.getState());
});
// unsubscribe();

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Andrew'
});

store.dispatch(
  {
    type: "ADD_HOBBY",
    hobby: "running"
  }
);

store.dispatch(
  {
    type: "ADD_HOBBY",
    hobby: "Playing cricket"
  }
);
// remove from hobby array
store.dispatch({
  type: "REMOVE_HOBBY",
  id: 2,
});

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Emily'
});
// add movie
store.dispatch({
  type: "ADD_MOVIE",
  title: "Lord of the rings",
  genre: "Someone"
});


store.dispatch({
  type: "ADD_MOVIE",
  title: "Mad Max",
  genre: "Action"
});

store.dispatch({
  type: "ADD_MOVIE",
  title: "Prince of Pharsia",
  genre: "Sakil-fg"
});

// remove movie from the array

store.dispatch({
  type: "REMOVE_MOVIE",
  id: 3
});
