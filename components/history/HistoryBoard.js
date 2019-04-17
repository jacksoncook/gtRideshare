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
import PostComponent from '../base/PostComponent';
import PostDetails from '../base/PostDetails';
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
class HistoryBoard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      postDetails: false,
      currPost: null,
    };
    this.props.watchPosts();
    this.returnToPosts = this.returnToPosts.bind(this);
    this.showPostDetails = this.showPostDetails.bind(this);
  }
  
  // Settings for header and nav bar
  static navigationOptions = {
    title: 'History',
    headerStyle: {
      backgroundColor: '#F5D580',
    },
    color: '#F5D580',
  };

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
      postDetails: false,
    });
  }

  render() {
    const { currPost, postDetails } = this.state;
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
        <FlatList
          data={posts}
          renderItem={({item}) => (
            (item.requests.has(user.uID) || user.uID === item.posterUID) ?
            <TouchableHighlight onPress={ _ => this.showPostDetails(item) }>
              <PostComponent
                post={item}
                destination={item.destination}
                date={item.date}
                departureTime={item.departureTime}
                driver={item.driver}
                postID={item.postID}
                returnTime={item.returnTime}
                startingLocation={item.startingLocation}
                requests={item.requests}
                posterUID={item.posterUID}
              />
            </TouchableHighlight>
            :
            null
            )}
        keyExtractor={(item) => item.postID}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryBoard);
