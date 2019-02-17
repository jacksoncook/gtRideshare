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
import { setUser } from '../redux/app-redux';

const FIREBASE_ATTRIBUTES = require('../constants/FirebaseAttributes');

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  setUser: (user) => { dispatch(setUser(user)); },
});

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
    paddingVertical: 5,
  },

  textInputs: {
    backgroundColor: 'white',
    borderColor: '#C4C4C4',
    borderWidth: 0.5,
    borderRadius: 4,
  },
});

// This component contains the login form

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      initBio: '',
      initFirstName: '',
      initLastName: '',
      initEmail: '',
      initPhoneNumber: '',
      rides: 0,
      uID: '',
      currBio: '',
      currFirstName: '',
      currLastName: '',
      currEmail: '',
      currPhoneNumber: '',
      postCount: 0,
      edited: true,
    };
    this.profileEdited = this.profileEdited.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.resetProfile = this.resetProfile.bind(this);
  }

  componentWillMount() {
    const { user } = this.state;
    this.setState({
      initBio: user.bio,
      initFirstName: user.firstName,
      initLastName: user.lastName,
      initEmail: user.email,
      initPhoneNumber: user.phoneNumber,
      currBio: user.bio,
      currFirstName: user.firstName,
      currLastName: user.lastName,
      currEmail: user.email,
      currPhoneNumber: user.phoneNumber,
      rides: user.rides,
      uID: user.uID,
      postCount: user.postCount,
    });
  }

  // Returns whether a field has been edited to determine
  // if update profile button should be displayed
  profileEdited() {
    const {
      currBio,
      currFirstName,
      currLastName,
      currEmail,
      currPhoneNumber,
      initBio,
      initFirstName,
      initLastName,
      initEmail,
      initPhoneNumber,
    } = this.state;
    if (currBio !== initBio
      || currFirstName !== initFirstName
      || currLastName !== initLastName
      || currEmail !== initEmail
      || currPhoneNumber !== initPhoneNumber) {
      this.setState({
        edited: true,
      });
    }
    this.setState({
      edited: false,
    });
  }

  // Resets profile to how it was before
  resetProfile() {
    const {
      initBio,
      initFirstName,
      initLastName,
      initEmail,
      initPhoneNumber,
    } = this.state;
    this.setState({
      currBio: initBio,
      currFirstName: initFirstName,
      currLastName: initLastName,
      currEmail: initEmail,
      currPhoneNumber: initPhoneNumber,
    });
  }

  // Updates profile in firebase
  updateProfile() {
    const {
      currBio,
      currFirstName,
      currLastName,
      currEmail,
      currPhoneNumber,
      uID,
      user,
      rides,
      postCount,
    } = this.state;
    firebase.database().ref(`${FIREBASE_ATTRIBUTES.USERS}/${uID}`).set({
      bio: currBio,
      firstName: currFirstName,
      lastName: currLastName,
      email: currEmail,
      phoneNumber: currPhoneNumber,
      uID,
      rides,
      postCount,
    }, (error) => {
      if (error) {
        Alert.alert(error.message);
      } else {
        // eslint-disable-next-line prefer-const
        let updatedUser = user;
        updatedUser.bio = currBio;
        updatedUser.firstName = currFirstName;
        updatedUser.lastName = currLastName;
        updatedUser.email = currEmail;
        updatedUser.phoneNumber = currPhoneNumber;
        updatedUser.uID = user.uID;
        updatedUser.postCount = user.postCount;
        updatedUser.rides = user.rides;
        this.setState({ user: updatedUser });
        this.props.setUser(updatedUser);
      }
    });
  }


  render() {
    const {
      currBio,
      currFirstName,
      currLastName,
      currEmail,
      currPhoneNumber,
      rides,
      edited,
    } = this.state;
    return (
      <View style={{
        padding: 10,
        backgroundColor: 'white',
        flex: 1,
      }}
      >
        <View style={styles.Label}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          About Me
          </Text>
        </View>
        <View style={styles.loginInputs}>
          <TextInput
            value={currBio}
            onChangeText={text => this.setState({ currBio: text })}
          />
        </View>
        <View style={styles.Label}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          First Name
          </Text>
        </View>
        <View style={styles.loginInputs}>
          <TextInput
            value={currFirstName}
            onChangeText={text => this.setState({ currFirstName: text })}
          />
        </View>
        <View style={styles.Label}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Last Name
          </Text>
        </View>
        <View style={styles.loginInputs}>
          <TextInput
            value={currLastName}
            onChangeText={text => this.setState({ currLastName: text })}
          />
        </View>
        <View style={styles.Label}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Email
          </Text>
        </View>
        <View style={styles.loginInputs}>
          <TextInput
            value={currEmail}
            onChangeText={text => this.setState({ currEmail: text })}
          />
        </View>
        <View style={styles.Label}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Phone Number
          </Text>
        </View>
        <View style={styles.loginInputs}>
          <TextInput
            value={currPhoneNumber}
            onChangeText={text => this.setState({ currPhoneNumber: text })}
          />
        </View>
        <View style={styles.Label}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Ride Count
          </Text>
        </View>
        <View style={styles.loginInputs}>
          <Text>
            {rides}
          </Text>
        </View>
        {edited ? (
          <View style={{
            flex: 1,
            flexDirection: 'row',
            paddingVertical: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <TouchableHighlight onPress={this.resetProfile}>
              <Text
                style={{ color: '#004F9F' }}
                onClick={this.resetProfile}
              >
            Reset Changes
              </Text>
            </TouchableHighlight>
            <Button
              onPress={this.updateProfile}
              color="#F5D580"
              title="Update Profile"
            />
          </View>
        ) : null}

      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
