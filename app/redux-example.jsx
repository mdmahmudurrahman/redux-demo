// var redux = require("redux");
//
// console.log("Starting redux example");
//
// // pure functions
//
// function add (a,b) {
//   return a + b;
// }
//
// console.log(add(5,6));
//
// // The question: what it makes a pure function?
// // => It's always going to return the same result giving the same
// // input. If a is 1, b is 2, it always return 3.
// //
// // => There is no side effect. It does not rely on variables up above.
// // meaning it does not updates/change any valiables outside of itself.
// //
// // => Our pure function can't have any asynchronous request, this means
// // no promises or callbacks in the pure function.
//
//
// var e = 3;
//
// function add(b){
//   return e + b;
// }
//
// // **In this case our function is not pure. Because it relies on data
// // outside of itself and giving the same input, we are not getting
// // the same output, because the var a may be changed in the outside.
//
// var result;
// function add(a, b){
//   result = a + b;
//   return result;
// }
//
// // ** Here this function is not also a pure function, because it
// //    modifying something outside of it.
//
//    function add(a, b){
//      return a + b + new Date().getSeconds();
//    }
//
// //    ** Here with the same input we are not always getting the same
// //    output.
// //
// // ****** For the pure function, they are not allowed to update the data
// // they passed in. This is really a matter for objects that are passed
// // by reference, not by value.
//
// // We can't do the following thing, because it change the actual object.
//
// function changeProp(obj){
//   obj.name = "Mahmud";
//   return obj;
// }
//
// var startingValue = {
//   name: "Andrew",
//   age: 25
// };
//
// var res = changeProp(startingValue);
// console.log(startingValue);
// console.log(res);
// console.log(startingValue);
//
// // We have to do the above thing in the following way(es6 syntax)
// // ...obj => it actually grab the object and than return the changed value
//
// function changeProp(obj){
//   console.log(obj.name);
//   return {
//     ...obj,
//     name: "Mahmud"
//   };
// }
//
//
// var startingValue = {
//   name: "start",
//   age: 26
// };
//
// var res = changeProp(startingValue);
// console.log(startingValue);
// console.log(res);
// console.log(startingValue);
//
//
// // This is very important for redux to create pure functions. Inside of your redux
// // there are certain part of your code that have to be pure function, otherwise it will
// // not work as expected.
// // Three principles
// //     a. Same output with the same input
// //     b. There is no side effect. It does not rely on variables up above.
// //        meaning it does not updates/change any valiables outside of itself.
// //     c. Our pure function can't have any asynchronous request, this means
// //        no promises or callbacks in the pure function.
//
//
// // Creating reducer and getting app state: a reducer is basically a function.
//
// // var reducer = (state, action) => {
// //   state = state || {name: "Anonymous"}
// //   return state;
// // };
// //
// // var store = redux.createStore(reducer);
//
// //or
//
// // var reducer = (state = {name: "Anonymous"}, action) => {
// //   // 1. here the reducer has a default state.
// //   // 2. our reducer function always returns a state. State is nothing but a
// //   // simple object with some properties
// //   return state;
// // };
// //
// // var store = redux.createStore(reducer);
// //
// // var currentState = store.getState()
// // console.log("currentState: ", currentState);
//
//

var redux = require('redux');

console.log('Starting redux example');

var stateDefault = {
  name: "Anonymous",
  hobbies: [],
  movies: []
}
var nextHobbyId = 1;
var nextMovieId = 1;

var reducer = (state = stateDefault, action) => {
  // state = state || {name: 'Anonymous'};

  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      }
    case "ADD_HOBBY":
      return {
        ...state,
        hobbies: [
          ...state.hobbies,
          {
            id: nextHobbyId++,
            hobby: action.hobby
          }
        ]
      }
    case "ADD_MOVIE":
      return {
        ...state,
        movies: [
          ...state.movies,  // grabbing current element in the movies
          {
            id: nextMovieId++,
            title: action.title,
            genre: action.genre
          }
        ]
      }
    case "REMOVE_HOBBY":
      return {
        ...state,
        hobbies: state.hobbies.filter((hobby) => hobby.id !== action.id)
      }
    case "REMOVE_MOVIE":
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.id)
      }
    default:
      return state;
  }
};
var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Subscribe to changes
var unsubscribe = store.subscribe(() => {
  var state = store.getState();

  console.log('Name is', state.name);
  console.log("New state:", store.getState());
  document.getElementById('app').innerHTML = state.name;
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
