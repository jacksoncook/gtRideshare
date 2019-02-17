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
    case 'setUser':
      return { ...state, user: action.value };
    case 'setPosts':
      return { ...state, posts: action.value };
    default:
      return state;
  }
};

// Aciton Creators

const createPost = post => ({
  type: 'createPost',
  value: post,
});

const setUser = user => ({
  type: 'setUser',
  value: user,
});

const setPosts = posts => ({
  type: 'setPosts',
  value: posts,
});

// Store

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export {
  store, createPost, setUser, setPosts,
};
