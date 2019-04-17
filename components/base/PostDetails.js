/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-unused-state */
import React from 'react';
import {
  Alert,
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import UserProfile from '../UserProfile';
import ContactRequest from './ContactRequest';

const styles = StyleSheet.create({
  label: {
    paddingRight: 20,
    paddingLeft: 20,
    flex: 1,
    paddingVertical: 5,
    backgroundColor: 'grey',
  },

  loginInputs: {
    paddingRight: 20,
    paddingLeft: 20,
    flex: 1,
    paddingVertical: 0,
  },

  textInputs: {
    backgroundColor: 'white',
    borderColor: '#C4C4C4',
    borderWidth: 0.5,
    borderRadius: 4,
  },
});

const FIREBASE_ATTRIBUTES = require('../../constants/FirebaseAttributes');

// This component contains the login form
class PostDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.post,
      uID: this.props.uID,
      matches: this.props.matches,
      exploringUser: false,
    };
    this.requestContact = this.requestContact.bind(this);
    this.exploreUserProfile = this.exploreUserProfile.bind(this);
    this.showExploringUser = this.showExploringUser.bind(this);
    this.returnToPost = this.returnToPost.bind(this);
    this.removePost = this.removePost.bind(this);
    this.accept = this.accept.bind(this);
    this.deny = this.deny.bind(this);
  }

  // Request contact with another user through their post
  requestContact() {
    const { post, uID } = this.state;
    firebase.database()
      .ref(`${FIREBASE_ATTRIBUTES.POSTS}/${post.postID}/${FIREBASE_ATTRIBUTES.REQUESTS}`)
      .child(uID)
      .set(true);
    this.props.returnToPosts();
  }

  // Get user profile for exploration
  exploreUserProfile(uid) {
    // const { posterUID } = this.state.post;
    firebase.database().ref(`${FIREBASE_ATTRIBUTES.USERS}/${uid}`).on('value', (snapshot) => {
      this.setState({ userToExplore: snapshot.val() });
      this.showExploringUser();
    }, (error) => {
      if (error) {
        Alert.alert(error.message);
      }
    });
  }

  // Return to this screen from user profile exploring
  returnToPost() {
    this.setState({
      exploringUser: false,
    });
  }

  // Delete post from firebase database
  removePost() {
    const { postID } = this.state.post;
    firebase.database()
      .ref(`${FIREBASE_ATTRIBUTES.POSTS}`).child(postID).set(null);
    this.props.returnToPosts();
  }

  // Shows the explore user modal
  showExploringUser() {
    this.setState({
      exploringUser: true,
    });
  }

  // Accept request for contact
  accept(uid) {
    const { uID } = this.state;
    firebase.database()
      .ref(`${FIREBASE_ATTRIBUTES.USERS}/${uID}/${FIREBASE_ATTRIBUTES.MATCHES}`)
      .child(uid)
      .set(true);
    firebase.database()
      .ref(`${FIREBASE_ATTRIBUTES.USERS}/${uid}/${FIREBASE_ATTRIBUTES.MATCHES}`)
      .child(uID)
      .set(true);
    this.props.returnToPosts();
  }

  // Deny request for contact
  deny(uid) {
    const { post } = this.state;
    firebase.database()
      .ref(`${FIREBASE_ATTRIBUTES.POSTS}/${post.postID}/${FIREBASE_ATTRIBUTES.REQUESTS}`)
      .child(uid)
      .set(null);
    this.props.returnToPosts();
  }

  render() {
    const {
      description,
      startingLocation,
      destination,
      departureTime,
      returnTime,
      date,
      driver,
      posterUID,
      requests,
    } = this.state.post;
    const { matches } = this.state;
    let preMatched = matches.has(posterUID);
    for (const req of requests) {
      console.log(req);
      if (!preMatched) {
        preMatched = matches.has(req);
      }
    }
    return (
      <View style={{
        padding: 10,
        backgroundColor: 'white',
        flex: 1,
      }}
      >
        <Modal
          transparent={false}
          visible={this.state.exploringUser}
          onRequestClose={() => {
          }}
        >
          <UserProfile
            returnToPosts={this.returnToPosts}
            screenProps={{ user: this.state.userToExplore, myProfile: false, matched: preMatched }}
            returnToPost={this.returnToPost}
          />
        </Modal>
        <View style={{
          backgroundColor: 'white',
          flex: 2,
        }}
        >
          <View style={styles.Label}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', paddingTop: 20 }}>
              Post Description
            </Text>
          </View>
          <View style={styles.loginInputs}>
            <Text multiline>
              {description}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Starting Location
            </Text>
          </View>
          <View style={styles.loginInputs}>
            <Text multiline>
              {startingLocation}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Destination
            </Text>
          </View>
          <View style={styles.loginInputs}>
            <Text multiline>
              {destination}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Departure Time
            </Text>
          </View>
          <View style={styles.loginInputs}>
            <Text multiline>
              {departureTime}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Return Time
            </Text>
          </View>
          <View style={styles.loginInputs}>
            <Text multiline>
              {returnTime}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Date(s)
            </Text>
          </View>
          <View style={styles.loginInputs}>
            <Text multiline>
              {date}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Driver
            </Text>
          </View>
          <View style={styles.loginInputs}>
            <Text>
              {driver ? 'Driver' : 'Rider'}
            </Text>
          </View>
        </View>
        {this.state.uID !== posterUID
          ? (
            <Button
              onPress={_ => this.exploreUserProfile(posterUID)}
              style={{
                flex: 1,
                flexDirection: 'row',
              }}
              color="#004F9F"
              title="Explore this user's profile"
            />
          )
          : null}
        {this.state.uID !== posterUID && !requests.has(this.state.uID)
          ? (
            <Button
              onPress={this.requestContact}
              style={{
                flex: 1,
                flexDirection: 'row',
              }}
              color="#F5D580"
              title="Request Contact"
            />
          ) : null}
        {this.state.uID === posterUID
          ? (
            <FlatList
              data={Array.from(requests)}
              renderItem={({ item }) => (
                (matches.has(item))
                  ? (
                    <TouchableHighlight onPress={_ => this.exploreUserProfile(item)}>
                      <ContactRequest matched />
                    </TouchableHighlight>
                  )
                  : (
                    <TouchableHighlight onPress={_ => this.exploreUserProfile(item)}>
                      <ContactRequest matched={false} deny={_ => this.deny(item)} accept={_ => this.accept(item)} />
                    </TouchableHighlight>
                  )
              )}
            />
          )
          : null}
        {this.state.uID === posterUID
          ? (
            <Button
              onPress={this.removePost}
              style={{
                flex: 1,
                flexDirection: 'row',
              }}
              color="#8B0000"
              title="Delete Post"
            />
          )
          : null}
        <Button
          onPress={this.props.returnToPosts}
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
          color="#004F9F"
          title="Return to Posts"
        />
      </View>
    );
  }
}

export default connect()(PostDetails);
