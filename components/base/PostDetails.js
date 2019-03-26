/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-unused-state */
import React from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';


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
    };
    this.requestContact = this.requestContact.bind(this);
  }

  requestContact() {
    const { post, uID } = this.state;
    firebase.database()
      .ref(`${FIREBASE_ATTRIBUTES.USERS}/${uID}/${FIREBASE_ATTRIBUTES.INTERESTED_POSTS}`)
      .child(post.postID)
      .set(true);
    firebase.database()
      .ref(`${FIREBASE_ATTRIBUTES.POSTS}/${post.postID}/${FIREBASE_ATTRIBUTES.REQUESTS}`)
      .child(uID)
      .set(true);
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
      postID,
    } = this.state.post;
    return (
      <View style={{
        padding: 10,
        backgroundColor: 'white',
        flex: 1,
      }}
      >
        <View style={{
          backgroundColor: 'white',
          flex: 1,
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
        <Button
          onPress={this.requestContact}
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
          color="#F5D580"
          title="Request Contact"
        />
        <View style={{
          flex: 1,
          flexDirection: 'row',
          paddingVertical: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <Text onPress={this.props.returnToPosts}>Return to Post Board</Text>
        </View>
      </View>
    );
  }
}

export default connect()(PostDetails);
