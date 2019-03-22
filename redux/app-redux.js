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

const editUser = (user) => {
  const {
    bio,
    firstName,
    lastName,
    email,
    phoneNumber,
    uID,
    rides,
    postCount,
  } = user;
  return function (dispatch) {
    firebase.database().ref(`${FIREBASE_ATTRIBUTES.USERS}/${uID}`).set({
      bio,
      firstName,
      lastName,
      email,
      phoneNumber,
      uID,
      rides,
      postCount,
    }, (error) => {
      if (error) {
        Alert.alert(error.message);
      }
      // eslint-disable-next-line prefer-const
      dispatch(setUser(user));
    });
  };
};

const setPosts = posts => ({
  type: 'setPosts',
  value: posts,
});

const watchPosts = () => function (dispatch) {
  let posts = [];
  firebase.database().ref(`${FIREBASE_ATTRIBUTES.POSTS}`).on('value', (snapshot) => {
    snapshot.forEach((post) => {
      posts.push({
        date: post.val().date,
        departureTime: post.val().departureTime,
        descritption: post.val().descritption,
        destination: post.val().destination,
        driver: post.val().driver,
        posterUID: post.val().posterUID,
        returnTime: post.val().returnTime,
        startingLocation: post.val().startingLocation,
        time: post.val().time,
        postID: post.val().postID,
      });
    });
  }, (error) => {
    if (error) {
      Alert.alert(error.message);
    } else {
      dispatch(setPosts(posts));
    }
  });
};

// Store

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export {
  store, createPost, setUser, setPosts, editUser, watchPosts,
};
