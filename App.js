import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import * as firebase from 'firebase';
import AppNavigator from './navigation/AppNavigator';
import NotAuthenticated from './screens/NotAuthenticated';
import ApiKeys from './constants/ApiKeys.js';
import { Provider, connect } from 'react-redux';
import { store, setUser, setPosts } from './redux/app-redux';

const FIREBASE_ATTRIBUTES = require('./constants/FirebaseAttributes');

const mapStateToProps = state => ({
  user: state.user,
});

// Main app that is run by expo when expo start is ran

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      authenticated: false,
      authenticationReady: false,
      dataLoaded: 0,
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
    this.getUser = this.getUser.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged)
  }

  //Checks for authentification
  onAuthStateChanged(user) {
    this.setState({authenticationReady: true});
    this.setState({authenticated: !!user});
  }

  // Fetches current user data before in-app activity begins and stores
  // in Redux
  getUser() {
    return firebase.database().ref(`${FIREBASE_ATTRIBUTES.USERS}/${firebase.auth().currentUser.uid}`).on('value', (snapshot) => {
      const userData = snapshot.val();
      const matches = new Set();
      if (userData.matches !== undefined) {
        for (const match in userData.matches) {
          matches.add(match);
        }
      }
      userData.matches = matches;
      store.dispatch(setUser(userData));
      this.setState({
        dataLoaded: this.state.dataLoaded + 1,
        user: userData,
      });
    }, (error) => {
    });
  }

  // Fetches posts before in-app activity begins and converts it into
  // a parseable list of posts and stores in redux
  getPosts() {
    const posts = [];
    posts.length = 0;
    var alreadyAdded = new Set();
    return firebase.database().ref(`${FIREBASE_ATTRIBUTES.POSTS}`).orderByChild('time').on('value', (snapshot) => {
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
          })
          alreadyAdded.add(post.val().postID);
        }
      })
      store.dispatch(setPosts(posts));
      this.setState({
        dataLoaded: this.state.dataLoaded + 1
      });
    }, (error) => {
    });
  }

  render() {
    if (!this.state.authenticated) {
      return <NotAuthenticated />;
    }
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen || this.state.dataLoaded < 2) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator screenProps={ {user: this.state.user, myProfile: true, matched: true} } />
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      await this.getUser(),
      await this.getPosts(),
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

