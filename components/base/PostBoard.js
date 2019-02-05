/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  FlatList,
  Modal,
  // StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import CreatePost from './CreatePost';
import PostComponent from './PostComponent';

const mapStateToProps = state => ({
  user: state.user,
  posts: state.posts,
});

// const styles = StyleSheet.create({
//   addPostButton: {
//     position: 'absolute',
//     right: 15,
//     bottom: 15,
//   },
// });

// This component contains the post board

class PostBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createPost: false,
      user: this.props.user,
      posts: this.props.posts,
    };
    this.returnToPosts = this.returnToPosts.bind(this);
    this.showCreatePost = this.showCreatePost.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  // Shows the create post modal on activation
  showCreatePost() {
    this.setState({
      createPost: true,
    });
  }

  // Currently only here for testing purposes
  signOut = () => {
    firebase.auth().signOut()
  }

  // This is passed to the modal to allow for returning to the post board
  // from the create posts screen
  returnToPosts() {
    this.setState({
      createPost: false,
    });
  }

  render() {
    const { createPost, user, posts } = this.state;
    console.log(posts[0]);
    return (
      <View style={{
        padding: 10,
        backgroundColor: 'white',
        flex: 1,
      }}
      >
        <TouchableHighlight onPress={this.showCreatePost}>
          {/* <Image
            source={require('../../assets/images/addPost.png')}
            style={styles.addPostButton}
          /> */}
          <Text>Yolo</Text>
        </TouchableHighlight>
        <Modal
          transparent={false}
          visible={createPost}
          onRequestClose={() => {
          }}
        >
          <CreatePost returnToPosts={this.returnToPosts} />
        </Modal>
        <FlatList
        data={posts}
        renderItem={({item}) => (
          <PostComponent
          destination={item.destination}
          date={item.date}
          departureTime={item.departureTime}
          driver={item.driver}
          postID={item.postID}
          returnTime={item.returnTime}
          startingLocation={item.startingLocation}
          />
        )}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps)(PostBoard);
