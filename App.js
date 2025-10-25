import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { JournalProvider } from './src/context/JournalContext';

const App = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 40,
      }}
    >
      <NavigationContainer theme={MyTheme}>
        <JournalProvider>
          <AppNavigator />
        </JournalProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
};
export default App;
