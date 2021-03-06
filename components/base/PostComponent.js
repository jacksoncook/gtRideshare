/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-unused-state */
import React from 'react';
import {
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
  },

});

// This component is the post template

export default class PostComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // post: this.props.postToRender,
    };
  }

  render() {
    const post = this.props;
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
          <Text>
            {post.driver ? 'Driver' : 'Rider'}
          </Text>
          <Text>
            {`${post.date}`}
          </Text>
          <Text>
            {`Departure: ${post.departureTime}`}
          </Text>
          <Text>
            {`Return: ${post.returnTime}`}
          </Text>
          <Text>
            {`Start: ${post.startingLocation}`}
          </Text>
          <Text>
            {`Destination: ${post.destination}`}
          </Text>
        </View>
      </View>
    );
  }
}
