/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Modal,
  // StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import CreatePost from './CreatePost';
import { setUser, watchUserData } from '../../redux/app-redux';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => { dispatch(setUser(user)) },
    watchUserData: (currUid) => { dispatch(watchUserData(currUid)) },
  }
}

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
    };
    this.returnToPosts = this.returnToPosts.bind(this);
    this.showCreatePost = this.showCreatePost.bind(this);
    this.signOut = this.signOut.bind(this);
    const currUid = firebase.auth().currentUser.uid;
    this.props.watchUserData(currUid);
  }

  showCreatePost() {
    this.setState({
      createPost: true,
    });
  }

  signOut = () => {
    firebase.auth().signOut()
  }

  returnToPosts() {
    this.setState({
      createPost: false,
    });
  }

  render() {
    const { createPost, user } = this.state;
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
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostBoard);
