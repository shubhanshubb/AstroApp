import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' , paddingTop: 30,}}>
      <NavigationContainer theme={MyTheme}>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};
export default App;
