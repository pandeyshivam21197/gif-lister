import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Icon, icons} from '../../../components/atoms/Icon';
import {NavigationKeys} from '../../constants';
import HomeStackNavigator from './homeStackNavigator';

export type BottomTabNavigatorParamList = {
  [NavigationKeys.homeStack]: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const tabOptions = (tabLabel: string, iconName: string) => ({
  tabBarIcon: ({color}: {color: string}) => (
    <Icon name={iconName} color={color} size={25} />
  ),
  tabBarShowLabel: true,
  tabBarLabel: tabLabel,
});

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <BottomTab.Screen
        name={NavigationKeys.homeStack}
        component={HomeStackNavigator}
        options={tabOptions('Home', icons.home)}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
