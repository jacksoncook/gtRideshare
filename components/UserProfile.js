/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-unused-state */
import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { editUser } from '../redux/app-redux';

const mapDispatchToProps = dispatch => ({
  editUser: (user) => { dispatch(editUser(user)); },
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
      user: this.props.screenProps.user,
      rides: 0,
      uID: '',
      currBio: '',
      currFirstName: '',
      currLastName: '',
      currEmail: '',
      currPhoneNumber: '',
      postCount: 0,
      edited: false,

    };
    this.updateProfile = this.updateProfile.bind(this);
    this.resetProfile = this.resetProfile.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  // Settings for header and nav bar
  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      backgroundColor: '#F5D580',
    },
    color: '#F5D580',
  };

  componentWillMount() {
    const { user } = this.props.screenProps;
    if (user) {
      this.setState({
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
  }

  // Resets profile to how it was before
  resetProfile() {
    const {
      user
    } = this.props.screenProps;
    this.setState({
      currBio: user.bio,
      currFirstName: user.firstName,
      currLastName: user.lastName,
      currEmail: user.email,
      currPhoneNumber: user.phoneNumber,
      edited: false,
    });
  }

  signOut() {
    firebase.auth().signOut();
  }

  // Updates profile in firebase
  updateProfile() {
    const {
      currBio,
      currFirstName,
      currLastName,
      currEmail,
      currPhoneNumber,
    } = this.state;
    const { user } = this.state;
    let updatedUser = user;
    updatedUser.bio = currBio;
    updatedUser.firstName = currFirstName;
    updatedUser.lastName = currLastName;
    updatedUser.email = currEmail;
    updatedUser.phoneNumber = currPhoneNumber;
    updatedUser.uID = user.uID;
    updatedUser.postCount = user.postCount;
    updatedUser.rides = user.rides;
    updatedUser.matches = user.matches
    this.props.editUser(updatedUser);
    this.setState({
      user: updatedUser,
      edited: false,
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
    console.log(this.state.user);
    return (
      <View style={{
        padding: 25,
        backgroundColor: 'white',
        flex: 1,
      }}
      >
      {this.props.screenProps.myProfile ?
      <Button
        onPress={this.signOut}
        color="#004F9F"
        title="Logout"
      />
      :
      
      <Button
        onPress={this.props.returnToPost}
        color="#004F9F"
        title="Return to Post"
      />}
        <View style={styles.Label}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          About Me
          </Text>
        </View>
        <View style={styles.loginInputs}>
          <TextInput
            value={currBio}
            multiline
            editable={this.props.screenProps.myProfile}
            onChangeText={text => this.setState({
              currBio: text,
              edited: true,
            })}
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
            editable={this.props.screenProps.myProfile}
            onChangeText={text => this.setState({
              currFirstName: text,
              edited: true,
            })}
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
            editable={this.props.screenProps.myProfile}
            onChangeText={text => this.setState({
              currLastName: text,
              edited: true,
            })}
          />
        </View>
        <View style={styles.Label}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Email
          </Text>
        </View>
        <View style={styles.loginInputs}>
          {this.props.screenProps.matched ?
            <TextInput
              value={currEmail}
              editable={this.props.screenProps.myProfile}
              onChangeText={text => this.setState({
                currEmail: text,
                edited: true,
              })}
            />
            :
            <Text>*****@gatech.edu</Text>}
        </View>
        <View style={styles.Label}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Phone Number
          </Text>
        </View>
        <View style={styles.loginInputs}>
          {this.props.screenProps.matched ?
            <TextInput
              value={currPhoneNumber}
              editable={this.props.screenProps.myProfile}
              onChangeText={text => this.setState({
                currPhoneNumber: text,
                edited: true,
              })}
            />
            :
            <Text>***-***-****</Text>}
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
            <TouchableHighlight onPress={this.resetProfile} underlayColor='white'>
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
        ) : 
        <View style={{
          flex: 1,
          flexDirection: 'row',
          paddingVertical: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        />}
      </View>
    );
  }
}

export default connect(null, mapDispatchToProps)(UserProfile);
