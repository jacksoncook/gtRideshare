import React from 'react';
import {
  Text,
  View,
} from 'react-native';

import LoginComponent from './LoginComponent'

import RegistrationComponent from './RegistrationComponent'

{/* 
  This component is going to contain both login and registration
  components
*/} 
export default class NoNavBarContainer extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
      super(props);
      this.state = {currentForm: 'login'};
      this.register = this.register.bind(this);
      this.returnToLogin = this.returnToLogin.bind(this);
  }

  // This method allows child components to switch the parent state from
  // the LoginComponent to the RegistrationComponent
  register() {
    this.setState({
      currentForm: 'registration'
    })
  }

  // This method allows child components to switch the parent state from
  // the RegistrationComponent to the LoginComponent
  returnToLogin() {
    this.setState({
      currentForm: 'login'
    })
  }

  render() {
      return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
        }}>
            <View style={{flex: 1, backgroundColor: '#F5D580'}} />
            <View style={{flex: 3}}>
              {this.state.currentForm === 'login'
                ? <LoginComponent register = {this.register} /> :
                  <RegistrationComponent returnToLogin = {this.returnToLogin} />}
            </View>
            <View style={{flex: 1, backgroundColor: '#F5D580'}} />
        </View>
      );
    }
  };

