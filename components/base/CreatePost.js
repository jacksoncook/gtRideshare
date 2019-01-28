/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

const FIREBASE_ATTRIBUTES = require('../../constants/FirebaseAttributes');

const mapStateToProps = state => ({
  user: state.user,
  posts: state.posts,
});

// const mapDispatchToProps = state => ({
//   user: state.user,
//   posts: state.posts,
// });

// This component contains the create post form

const styles = StyleSheet.create({
  smallInput: {
    paddingRight: 20,
    paddingLeft: 20,
    flex: 1,
    paddingVertical: 5,
  },

  textInput: {
    backgroundColor: 'white',
    borderColor: '#C4C4C4',
    borderWidth: 0.5,
    borderRadius: 4,
  },

  largeInput: {
    paddingRight: 20,
    paddingLeft: 20,
    flex: 3,
    paddingVertical: 5,
  },

});

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      posts: this.props.posts,
      postDescription: '',
      postStartingLocation: '',
      postDestination: '',
      postDepartureTime: '',
      postReturnTime: '',
      postDate: '',
      postDriver: false,
    };
    this.onPostPress = this.onPostPress.bind(this);
  }

  onPostPress() {
    const {
      user,
      posts,
      postDescription,
      postStartingLocation,
      postDestination,
      postDepartureTime,
      postReturnTime,
      postDate,
      postDriver,
    } = this.state;
    const par = this.props;
    const postId = `${user.uID}-${user.postCount}`;
    firebase.database().ref(`${FIREBASE_ATTRIBUTES.POSTS}/${postId}`).set({
      description: postDescription,
      startingLocation: postStartingLocation,
      destination: postDestination,
      departureTime: postDepartureTime,
      returnTime: postReturnTime,
      date: postDate,
      driver: postDriver,
      posterUID: user.uID,
      time: new Date().toLocaleString(),
    }, (error) => {
      if (error) {
        Alert.alert(error.message);
      } else {
        const count = user.postCount + 1;
        firebase.database().ref(`${FIREBASE_ATTRIBUTES.USERS}/${user.uID}`).update({
          postCount: count,
        }, (secondError) => {
          if (secondError) {
            Alert.alert(error.message);
          } else {
          }
        });
        par.returnToPosts();
      }
    });
  }

  render() {
    return (
      <View style={{
        padding: 10,
        backgroundColor: 'white',
        flex: 1,
      }}
      >
        <View style={styles.largeInput}>
          <TextInput
            style={styles.textInputs}
            placeholder="Description"
            onChangeText={text => this.setState({ postDescription: text })}
          />
        </View>
        <View style={styles.smallInput}>
          <TextInput
            style={styles.textInputs}
            placeholder="Starting Location"
            onChangeText={text => this.setState({ postStartingLocation: text })}
          />
        </View>
        <View style={styles.smallInput}>
          <TextInput
            style={styles.textInputs}
            placeholder="Destination"
            onChangeText={text => this.setState({ postDestination: text })}
          />
        </View>
        <View style={styles.smallInput}>
          <TextInput
            style={styles.textInputs}
            placeholder="Departure Time"
            onChangeText={text => this.setState({ postDepartureTime: text })}
          />
        </View>
        <View style={styles.smallInput}>
          <TextInput
            style={styles.textInputs}
            placeholder="Return Time"
            onChangeText={text => this.setState({ postReturnTime: text })}
          />
        </View>
        <View style={styles.smallInput}>
          <TextInput
            style={styles.textInputs}
            placeholder="Date/Days (i.e. Mon, Tue, 1/12/2019, etc.)"
            onChangeText={text => this.setState({ postDate: text })}
          />
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          paddingVertical: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <Button
            onPress={this.onPostPress}
            style={{ flex: 1 }}
            color="#F5D580"
            title="Post"
          />
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          paddingVertical: 20,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
        >
          <Text>New user?</Text>
          <Button
            onPress={this.onPostPress}
            color="#004F9F"
            title="Register"
          />
        </View>
      </View>
    );
  }
}
export default connect(mapStateToProps)(CreatePost);
