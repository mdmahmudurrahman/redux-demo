01. Install redux => npm install react --save
02.




=========================
 1. Separating actions, reducers, store into 3 files
 2. Configuring store in the configureStore.jsx file.
```
 var redux = require("redux");
 // loading reducers
 var {nameReducer, hobbiesReducer, moviesReducer, mapReducer} = require("./../reducers/index.jsx");



 export var configure = () => {
   var reducer = redux.combineReducers({
     name: nameReducer,
     hobbies: hobbiesReducer,
     movies: moviesReducer,
     map: mapReducer
   });

   var store = redux.createStore(reducer, redux.compose(
     window.devToolsExtension ? window.devToolsExtension() : f => f
   ));

   return store;
 }
```
 3. load in reducers using ex6 destructuring over in store/configureStore.jsx
 ```
 var {nameReducer, hobbiesReducer, moviesReducer, mapReducer} = require("./../reducers/index.jsx");
```

4. load in configureStore and actions over in creating-action-generator.jsx

```
var actions = require("./actions/index");
var store = require("./store/configureStore").configure();

```

5. install thunk library =>  npm install --save-dev redux-thunk
```
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
```

6. Using thunk, we can actually configure redux to work with functions. Which means instead of returning an object we want to return an object.
