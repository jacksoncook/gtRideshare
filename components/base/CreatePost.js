/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

const FIREBASE_ATTRIBUTES = require('../../constants/FirebaseAttributes');

const mapStateToProps = state => ({
  user: state.user,
});

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

// This component contains the create post form

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      postDescription: '',
      postStartingLocation: '',
      postDestination: '',
      postDepartureTime: '',
      postReturnTime: '',
      postDate: '',
      postDriver: false,
    };
    this.onPostPress = this.onPostPress.bind(this);
    this.onToggleDriver = this.onToggleDriver.bind(this);
  }

  // This method pushes the new post to firebase dtabase
  onPostPress() {
    const {
      user,
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
      postID: postId,
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
            par.returnToPosts();
          }
        });
      }
    });
  }

  // This method allows for the switch to toggle the state of the component
  onToggleDriver() {
    this.setState(prevState => ({
      postDriver: !prevState.postDriver,
    }));
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
            style={{
              backgroundColor: 'white',
              borderColor: '#C4C4C4',
              paddingTop: 50,
            }}
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
          <View style={{
            flex: 1,
            flexDirection: 'row',
            paddingVertical: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <Text>Driver?</Text>
            <Switch
              value={this.state.postDriver}
              onValueChange={this.onToggleDriver}
              color="#004F9F"
            />
          </View>
        </View>
        <Button
          onPress={this.onPostPress}
          style={{ flex: 1, flexDirection: 'row' }}
          color="#F5D580"
          title="Post"
        />
        <View style={{
          flex: 1,
          flexDirection: 'row',
          paddingVertical: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <Text onPress={this.props.returnToPosts}>Cancel Post Creation</Text>

        </View>
      </View>
    );
  }
}
export default connect(mapStateToProps)(CreatePost);
