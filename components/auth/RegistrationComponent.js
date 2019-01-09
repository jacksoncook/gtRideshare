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
const FIREBASE_ATTRIBUTES = require('../../constants/FirebaseAttributes');
{/* 
  This component contains the Registration form
*/}

export default class RegistrationComponent extends React.Component {
    
  constructor(props) {
      super(props);
      this.state = {
        firstName: '',
        lastName: '',
        userEmail: '',
        password: '',
        confirmedPassword: '',
    };
  }
  
  onRegisterPress = () => {
      if (this.state.password === this.state.confirmedPassword) {
        firebase.auth().createUserWithEmailAndPassword(this.state.userEmail.trim(), this.state.password)
          .then(() => { 
              firebase.database().ref(FIREBASE_ATTRIBUTES.USERS + '/' + firebase.auth().currentUser.uid).set({
                  firstName: this.state.firstName,
                  lastName: this.state.lastName,
                  email: this.state.userEmail,
                  phoneNumber: 'XXX-XXX-XXXX',
                  rides: 0,
                  posts: 0,
              });
          }, (error) => {
              Alert.alert(error.message);
          });
      } else {
          Alert.alert("Passwords do not match");
          return;
      }
  }

  render() {
      return (
        <View style={{
            padding: 10,
            backgroundColor: 'white',
            flex: 1,
        }}>
            <View style={styles.registrationInputs}>
                <TextInput
                    style={styles.textInputs}
                    placeholder="First Name"
                    onChangeText={(text) => this.setState({firstName: text})}
                />
            </View>
            <View style={styles.registrationInputs}>
                <TextInput
                    style={styles.textInputs}
                    placeholder="LastName"
                    onChangeText={(text) => this.setState({lastName: text})}
                />
            </View>
            <View style={styles.registrationInputs}>
                <TextInput
                    style={styles.textInputs}
                    placeholder="GT Email (...@gatech.edu)"
                    onChangeText={(text) => this.setState({userEmail: text})}
                />
            </View>
            <View style={styles.registrationInputs}>
                <TextInput
                    style={styles.textInputs}
                    secureTextEntry={true}
                    placeholder="Password"
                    onChangeText={(text) => this.setState({password: text})}
                />
            </View>
            <View style={styles.registrationInputs}>
                <TextInput
                    style={styles.textInputs}
                    secureTextEntry={true}
                    placeholder="Confirm Password"
                    onChangeText={(text) => this.setState({confirmedPassword: text})}
                />
            </View>
            <View style = {{
              flex: 1,
              flexDirection: 'row',
              paddingVertical: 20,
              justifyContent: 'center',
              alignItems: 'center'}}>
              <Button
                onPress={this.onRegisterPress}
                color='#F5D580'
                style={{paddingRight: 80, paddingLeft: 80, flex: 1}}
                title="Register"
            />
            </View>
            <View style = {{
              flex: 1,
              flexDirection: 'row',
              paddingVertical: 20,
              justifyContent: 'flex-end',
              alignItems: 'center'}}>
                <Text>Already have an account?</Text>
                <Button
                  onPress={this.props.returnToLogin}
                  color='#004F9F'
                  title="Return to Login"
                />
            </View>
        </View>
      );
    }
}
const styles = StyleSheet.create({
    registrationInputs: {
        paddingRight: 20,
        paddingLeft: 20,
        flex: 1,
    },
    textInputs: {
      backgroundColor: 'white',
      borderColor: '#C4C4C4',
      borderWidth: .5,
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
