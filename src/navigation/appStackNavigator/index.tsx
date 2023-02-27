import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {NavigationKeys} from '../constants';
import BottomTabNavigator from './bottomTabNavigator';

export type AppNavigatorParamList = {
  [NavigationKeys.bottomTab]: undefined;
};

const AppStack = createNativeStackNavigator<AppNavigatorParamList>();

// logged in user flow
const AppStackNavigator = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name={NavigationKeys.bottomTab}
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
