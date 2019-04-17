/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-unused-state */
import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  label: {
    paddingRight: 10,
    paddingLeft: 10,
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
  },

});

// This component is the post template

export default class ContactRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // post: this.props.postToRender,
    };
  }

  render() {
    const matched = this.props;
    console.log(matched);
    return (
      <View style={{
        padding: 5,
        backgroundColor: 'white',
        flex: 1,
        borderColor: 'grey',
        borderWidth: 1,
      }}
      >
        <View style={styles.label}>
          {this.props.matched ? (
            <Text>
              {'View your match!'}
            </Text>
          )
            : (
              <Text>
                {'A user wants to connect with you!'}
              </Text>
            )}
          {this.props.matched ? (
            null
          ) : (
            <Button
              onPress={this.props.accept}
              style={{
                flex: 1,
                flexDirection: 'row',
              }}
              color="#004F9F"
              title="Accept"
            />
          )}
          {this.props.matched ? (
            null
          ) : (
            <Button
              onPress={this.props.deny}
              style={{
                flex: 1,
                flexDirection: 'row',
              }}
              color="#8B0000"
              title="Deny"
            />
          )}
        </View>
      </View>
    );
  }
}
