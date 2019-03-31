/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import CreatePost from './CreatePost';
import PostComponent from './PostComponent';
import PostDetails from './PostDetails';
import { watchPosts } from '../../redux/app-redux';

const mapStateToProps = state => ({
  user: state.user,
  posts: state.posts,
});

const mapDispatchToProps = dispatch => ({
  watchPosts: () => { dispatch(watchPosts()); },
});

const styles = StyleSheet.create({
  addPostButton: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
});

// This component contains the post board
class PostBoard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      createPost: false,
      postDetails: false,
      currPost: null,
    };
    this.props.watchPosts();
    this.returnToPosts = this.returnToPosts.bind(this);
    this.showCreatePost = this.showCreatePost.bind(this);
    this.showPostDetails = this.showPostDetails.bind(this);
  }
  
  // Settings for header and nav bar
  static navigationOptions = {
    title: 'Posts',
    headerStyle: {
      backgroundColor: '#F5D580',
    },
    color: '#F5D580',
  };

  // Shows the create post modal on activation
  showCreatePost() {
    this.setState({
      createPost: true,
    });
  }

  // Shows post details modal on activation
  showPostDetails(post) {
    this.setState({
      postDetails: true,
      currPost: post,
    });
  }

  // This is passed to the modal to allow for returning to the post board
  // from the create posts screen
  returnToPosts() {
    this.setState({
      createPost: false,
      postDetails: false,
    });
  }

  render() {
    const { createPost, currPost, postDetails } = this.state;
    const { user, posts } = this.props;
    return (
      <View style={{
        padding: 10,
        backgroundColor: 'white',
        flex: 1,
      }}
      >
        <Modal
          transparent={false}
          visible={postDetails}
          onRequestClose={() => {
          }}
        >
          <PostDetails
            returnToPosts={this.returnToPosts}
            post={currPost}
            uID={user.uID}
            matches={user.matches}
          />
        </Modal>
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
            !(item.requests.has(user.uID) || user.uID === item.posterUID) ?
            <TouchableHighlight onPress={ _ => this.showPostDetails(item) }>
              <PostComponent
                destination={item.destination}
                date={item.date}
                departureTime={item.departureTime}
                driver={item.driver}
                postID={item.postID}
                returnTime={item.returnTime}
                startingLocation={item.startingLocation}
              />
            </TouchableHighlight>
            :
            null
            )}
        keyExtractor={(item) => item.postID}
        />
        <TouchableHighlight onPress={this.showCreatePost}>
          <Image
            source={require('../../assets/images/addPost.png')}
            style={styles.addPostButton}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostBoard);
