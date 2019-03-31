import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import PostBoard from '../components/base/PostBoard';
import HistoryBoard from '../components/history/HistoryBoard';
import UserProfile from '../components/UserProfile';

const tabBarOpt = {
  style: {
    backgroundColor: '#F5D580',
  },
  activeTintColor: 'black',
  inactiveTintColor: '#004F9F',
};

// This component creates the logged in view.  Currently it is being used
// to test additions such as the login screen in this case

const PostStack = createStackNavigator({
  Posts: PostBoard,
});

PostStack.navigationOptions = {
  tabBarLabel: 'Posts',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
  tabBarOptions: tabBarOpt,
};

const HistoryStack = createStackNavigator({
  History: HistoryBoard,
});

HistoryStack.navigationOptions = {
  tabBarLabel: 'History',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
  tabBarOptions: tabBarOpt,
};

const UserStack = createStackNavigator({
  Profile: UserProfile,
});

UserStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
  tabBarOptions: tabBarOpt,
};

export default createBottomTabNavigator({
  PostStack,
  HistoryStack,
  UserStack,
});
