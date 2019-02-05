/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-unused-state */
import React from 'react';
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
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

export default class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userEmail: '', password: '' };
    this.onLoginPress = this.onLoginPress.bind(this);
  }

  // Contacts firebase for login authentification
  onLoginPress() {
    const { userEmail, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(userEmail.trim(), password)
      .then(() => { }, (error) => {
        Alert.alert(error.message);
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
        <Image
          source={require('../../assets/images/gtRideshareLogo.png')}
          style={{
            flex: 5,
            resizeMode: 'contain',
          }}
        />
        <View style={styles.loginInputs}>
          <TextInput
            style={styles.textInputs}
            placeholder="Email (...@gatech.edu)"
            onChangeText={text => this.setState({ userEmail: text })}
          />
        </View>
        <View style={styles.loginInputs}>
          <TextInput
            style={styles.textInputs}
            secureTextEntry
            placeholder="Password"
            onChangeText={text => this.setState({ password: text })}
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
            onPress={this.onLoginPress}
            style={{ flex: 1 }}
            color="#F5D580"
            title="Log In"
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
            onPress={this.props.register}
            color="#004F9F"
            title="Register"
          />
        </View>
      </View>
    );
  }
}
