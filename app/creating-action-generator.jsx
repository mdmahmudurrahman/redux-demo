var redux = require('redux');
var axios = require("axios");
console.log('Starting redux example');

// Name reducer and action generators
// ----------------------------------
var nameReducer = (state = "Shakil-fg", action) => {
  switch (action.type) {
    case "CHANGE_NAME":
      return action.name;
    default:
      return state;
  };
};

var changeName = (name) => {
  return {
    type: "CHANGE_NAME",
    name
  }
};


// Hobbie reducer and action generators
// ----------------------------------
var nextHobbyId = 1;
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


// Movie reducer and action generators
// ----------------------------------
var nextMovieId = 1;
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


// Map reducer and action generators
// ----------------------------------

var mapReducer = (state = {isFetching: false, url: undefined}, action) => {
  switch (action.type) {
    case "START_LOCATION_FETCH":
      return {
        isFetching: true,
        url: undefined
      };
    case "COMPLETE_LOCATION_FETCH":
      return {
        isFetching: false,
        url: action.url
      };
    default:
      return state;
  }
};

var startLocationFetch = () => {
  return {
    type: "START_LOCATION_FETCH",
  }
};

var completeLocationFetch = (url) => {
  return {
    type: "COMPLETE_LOCATION_FETCH",
    url
  }
};

var fetchLocation = () => {
  store.dispatch(startLocationFetch());

  axios.get("http://ipinfo.io").then(function(res){
    var location = res.data.loc;
    var baseUrl = "http://maps.google.com?q=";

    store.dispatch(completeLocationFetch(baseUrl + location));
  }, function(res){
    alert(res.error);
  });
};

var addHobby = (Hobby) => {
  return {
    type: "ADD_HOBBY",
    hobby
  }
};

var removeHobby = (id) => {
  return {
    type: "REMOVE_HOBBY",
    id
  }
};

var addMovie = (title, genre) => {
  return {
    type: "ADD_MOVIE",
    title,
    genre
  }
};

var removeMovie = (id) => {
  return {
    type: "REMOVE_MOVIE",
    id
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
  movies: moviesReducer,
  map: mapReducer
});

var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

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

fetchLocation();
store.dispatch(changeName("Andrew"));
store.dispatch(addHobby("Running"));
store.dispatch(addHobby("Playing cricket"));

// remove from hobby array
store.dispatch(removeHobby(2));

store.dispatch(changeName("Emily"));
// add movie
store.dispatch(addMovie("Storm in the..", "some one"));
store.dispatch(addMovie("Mad Max", "actttttt"));
store.dispatch(addMovie("Prince of Pharsia", "Shakil-fg"));

// remove movie from the array
store.dispatch(removeMovie(3));
