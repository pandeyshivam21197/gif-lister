import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStackNavigator from './appStackNavigator';
import {useColorScheme} from 'react-native';
import {defaultTheme} from '../assets/theme/defaultTheme';
import {darkTheme} from '../assets/theme/darkTheme';

const RootNavigator = () => {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === 'dark' ? darkTheme : defaultTheme}>
      <AppStackNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
