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
        }}>
            <Image
              source={
                require('../assets/images/gtRideshareLogo.png')
              }
            />
            <View style={styles.loginInputs}>
                <TextInput
                    style={{height: 40, backgroundColor: 'white'}}
                    placeholder="Email (swag@gatech.edu)"
                    onChangeText={(userEmail) => this.setState({userEmail})}
                />
            </View>
            <View style={styles.loginInputs}>
                <TextInput
                    style={{height: 40, backgroundColor: 'white',}}
                    secureTextEntry={true}
                    placeholder="Password"
                    onChangeText={(password) => this.setState({password})}
                />
            </View>
            <Button
                onPress={() => {
                    Alert.alert('You tapped the button!');
                }}
                style={{paddingRight: 80, paddingLeft: 80}}
                title="Log In"
            />
        </View>
      );
    }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }
}
const styles = StyleSheet.create({
    loginInputs: {
        paddingRight: 40,
        paddingLeft: 40,
        height: 40
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
