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
  View,
} from 'react-native';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
  registrationInputs: {
    paddingRight: 20,
    paddingLeft: 20,
    flex: 1,
  },
  textInputs: {
    backgroundColor: 'white',
    borderColor: '#C4C4C4',
    borderWidth: 0.5,
    borderRadius: 4,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
});

const FIREBASE_ATTRIBUTES = require('../../constants/FirebaseAttributes');

// This component contains the Registration form

export default class RegistrationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userFirstName: '',
      userLastName: '',
      userEmail: '',
      password: '',
      confirmedPassword: '',
    };
    this.onRegisterPress = this.onRegisterPress.bind(this);
  }

  // Both registers the user with Firebase authentification and
  // stores user data in Firebase Database
  onRegisterPress() {
    const {
      userFirstName,
      userLastName,
      userEmail,
      password,
      confirmedPassword,
    } = this.state;
    if (password === confirmedPassword) {
      firebase.auth()
        .createUserWithEmailAndPassword(userEmail.trim(), password)
        .then(() => {
          const uid = firebase.auth().currentUser.uid;
          firebase.database().ref(`${FIREBASE_ATTRIBUTES.USERS}/${uid}`).set({
            bio: 'NoBio',
            firstName: userFirstName,
            lastName: userLastName,
            email: userEmail,
            phoneNumber: 'XXX-XXX-XXXX',
            rides: 0,
            postCount: 0,
            uID: uid,
          });
        }, (error) => {
          Alert.alert(error.message);
        });
    } else {
      Alert.alert('Passwords do not match');
    }
  }

  render() {
    return (
      <View style={{
        padding: 10,
        backgroundColor: 'white',
        flex: 1,
      }}
      >
        <View style={styles.registrationInputs}>
          <TextInput
            style={styles.textInputs}
            placeholder="First Name"
            onChangeText={text => this.setState({ userFirstName: text })}
          />
        </View>
        <View style={styles.registrationInputs}>
          <TextInput
            style={styles.textInputs}
            placeholder="LastName"
            onChangeText={text => this.setState({ userLastName: text })}
          />
        </View>
        <View style={styles.registrationInputs}>
          <TextInput
            style={styles.textInputs}
            placeholder="GT Email (...@gatech.edu)"
            onChangeText={text => this.setState({ userEmail: text })}
          />
        </View>
        <View style={styles.registrationInputs}>
          <TextInput
            style={styles.textInputs}
            secureTextEntry
            placeholder="Password"
            onChangeText={text => this.setState({ password: text })}
          />
        </View>
        <View style={styles.registrationInputs}>
          <TextInput
            style={styles.textInputs}
            secureTextEntry
            placeholder="Confirm Password"
            onChangeText={text => this.setState({ confirmedPassword: text })}
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
            onPress={this.onRegisterPress}
            color="#F5D580"
            style={{ paddingRight: 80, paddingLeft: 80, flex: 1 }}
            title="Register"
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
          <Text>Already have an account?</Text>
          <Button
            onPress={this.props.returnToLogin}
            color="#004F9F"
            title="Return to Login"
          />
        </View>
      </View>
    );
  }
}
