/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-unused-state */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  user: state.user,
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
    };
  }

  render() {
    return (
      <View style={{
        padding: 10,
        backgroundColor: 'white',
        flex: 1,
      }}
      >
        <View style={styles.Label}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          First Name
          </Text>
        </View>
        <View style={styles.loginInputs}>
          <Text>
            {this.state.user.firstName}
          </Text>
        </View>
        <View style={styles.Label}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Last Name
          </Text>
        </View>
        <View style={styles.loginInputs}>
          <Text>
            {this.state.user.lastName}
          </Text>
        </View>
        <View style={styles.Label}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Email
          </Text>
        </View>
        <View style={styles.loginInputs}>
          <Text>
            {this.state.user.email}
          </Text>
        </View>
        <View style={styles.Label}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Phone Number
          </Text>
        </View>
        <View style={styles.loginInputs}>
          <Text>
            {this.state.user.phoneNumber}
          </Text>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(UserProfile);
