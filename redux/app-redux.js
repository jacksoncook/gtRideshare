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
    matches,
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
      matches,
    }, (error) => {
      if (error) {
        Alert.alert(error.message);
      }
      // eslint-disable-next-line prefer-const
      console.log(matches);
      console.log(matches.values());
      console.log(matches.entries());
      console.log(Array.from(matches));
      if (matches !== undefined) {
        matches.forEach(match => firebase.database()
          .ref(`${FIREBASE_ATTRIBUTES.USERS}/${uID}/${FIREBASE_ATTRIBUTES.MATCHES}`)
          .child(match)
          .set(true));
      }
      dispatch(setUser(user));
    });
  };
};

const setPosts = posts => ({
  type: 'setPosts',
  value: posts,
});

const watchPosts = () => function (dispatch) {
  const posts = [];
  posts.length = 0;
  const alreadyAdded = new Set();
  firebase.database().ref(`${FIREBASE_ATTRIBUTES.POSTS}`).orderByChild('time').on('value', (snapshot) => {
    snapshot.forEach((post) => {
      if (!alreadyAdded.has(post.val().postID)) {
        const requesters = new Set();
        if (post.val().requests !== undefined) {
          for (const requester in post.val().requests) {
            requesters.add(requester);
          }
        }
        posts.push({
          date: post.val().date,
          departureTime: post.val().departureTime,
          description: post.val().description,
          destination: post.val().destination,
          driver: post.val().driver,
          posterUID: post.val().posterUID,
          returnTime: post.val().returnTime,
          startingLocation: post.val().startingLocation,
          time: post.val().time,
          postID: post.val().postID,
          requests: requesters,
        });
        alreadyAdded.add(post.val().postID);
      }
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
