import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as firebase from 'firebase';

const FIREBASE_ATTRIBUTES = require('../constants/FirebaseAttributes');

// Initial State

const initialState = {
  user: { },
  posts: { },
};

// Reducer

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'editUser':
      return { ...state, user: action.value };
    case 'setUser':
      return { ...state, user: action.value };
    default:
      return state;
  }
};

// Aciton Creators

const editUser = user => ({
  type: 'editUser',
  value: user,
});

const createPost = post => ({
  type: 'createPost',
  value: post,
});

const setUser = user => ({
  type: 'setUser',
  value: user,
});

const watchUserData = uid => function (dispatch) {
  firebase.database().ref(`${FIREBASE_ATTRIBUTES.USERS}/${uid}`).on('value', (snapshot) => {
    const userData = snapshot.val();
    dispatch(setUser(userData));
  }, (error) => {
  });
};

// const createPost =
// Store

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export {
  store, editUser, createPost, setUser, watchUserData,
};
