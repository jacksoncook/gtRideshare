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


{/* 
  This component contains the Registration form
*/} 

export default class RegistrationComponent extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
      super(props);
      this.state = {
        firstName: '',
        lastName: '',
        userEmail: '',
        password: '',
        confirmedPassword: ''};
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
                    onChangeText={(firstName) => this.setState({firstName})}
                />
            </View>
            <View style={styles.registrationInputs}>
                <TextInput
                    style={styles.textInputs}
                    placeholder="LastName"
                    onChangeText={(lastName) => this.setState({lastName})}
                />
            </View>
            <View style={styles.registrationInputs}>
                <TextInput
                    style={styles.textInputs}
                    placeholder="GT Email (...@gatech.edu)"
                    onChangeText={(userEmail) => this.setState({userEmail})}
                />
            </View>
            <View style={styles.registrationInputs}>
                <TextInput
                    style={styles.textInputs}
                    secureTextEntry={true}
                    placeholder="Password"
                    onChangeText={(password) => this.setState({password})}
                />
            </View>
            <View style={styles.registrationInputs}>
                <TextInput
                    style={styles.textInputs}
                    secureTextEntry={true}
                    placeholder="Confirm Password"
                    onChangeText={(confirmedPassword) => this.setState({confirmedPassword})}
                />
            </View>
            <View style = {{
              flex: 1,
              flexDirection: 'row',
              paddingVertical: 20,
              justifyContent: 'center',
              alignItems: 'center'}}>
              <Button
                onPress={() => {
                  Alert.alert('You tapped the button!');
                }}
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
                  onPress={() => {
                    this.props.returnToLogin();
                  }}
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
