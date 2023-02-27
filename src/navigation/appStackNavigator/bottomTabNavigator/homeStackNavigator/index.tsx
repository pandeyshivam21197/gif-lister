import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {NavigationKeys} from '../../../constants';
import {Home} from '../../../../screens/home';

export type HomeNavigatorParamList = {
  [NavigationKeys.homeScreen]: undefined;
};

const HomeStack = createNativeStackNavigator<HomeNavigatorParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={NavigationKeys.homeScreen}
        component={Home}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
