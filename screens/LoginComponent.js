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
  This component contains the login form as well as state updates
  for user inputted user email and password
*/} 

export default class LoginComponent extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
      super(props);
      this.state = {userEmail: '', password: ''};
  }

  render() {
      return (
        <View style={{
            padding: 10,
            backgroundColor: 'white',
            flex: 1,
        }}>
          <Image
            source={
              require('../assets/images/gtRideshareLogo.png')
            }
            style ={{
              flex: 5,
              resizeMode: 'contain'
            }}
          />
          <View style={styles.loginInputs}>
              <TextInput
                style={styles.textInputs}
                placeholder="Email (...@gatech.edu)"
                onChangeText={(userEmail) => this.setState({userEmail})}
              />
          </View>
          <View style={styles.loginInputs}>
              <TextInput
                style={styles.textInputs}
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={(password) => this.setState({password})}
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
                style={{flex: 1,}}
                color='#F5D580'
                title="Log In"
            />
          </View>
          <View style = {{
            flex: 1,
            flexDirection: 'row',
            paddingVertical: 20,
            justifyContent: 'flex-end',
            alignItems: 'center'}}>
              <Text>New user?</Text>
              <Button
                  onPress={() => {
                      this.props.register();
                  }}
                  color='#004F9F'
                  title="Register"
              />
          </View>
        </View>
      );
    }

}
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
