import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import LoginComponent from '../screens/LoginComponent'

{/* 
  This component is going to contain both login and registration
  components
*/} 
export default class NoNavBarContainer extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
      return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
        }}>
            <View style={{flex: 3, backgroundColor: '#F5D580'}} />
            <LoginComponent style={{flex: 1}} />
            <View style={{flex: 3, backgroundColor: '#F5D580'}} />
        </View>
      );
    }
  };
