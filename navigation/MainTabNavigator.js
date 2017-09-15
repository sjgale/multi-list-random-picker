import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import ListManagement from '../screens/ListManagementScreen';
import RandomizeScreen from '../screens/RandomizeScreen';

export default TabNavigator(
  {
    Lists: {
      screen: ListManagement,
    },
    Randomize: {
      screen: RandomizeScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Lists':
            iconName = Platform.OS === 'ios'
              ? `ios-brush${focused ? '' : '-outline'}`
              : 'md-create';
            break;
          case 'Randomize':
            iconName = Platform.OS === 'ios'
              ? `ios-pizza${focused ? '' : '-outline'}`
              : 'md-pizza';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
