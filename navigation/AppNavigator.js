import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from './BottomTab';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
        initialRouteName="Parent"
        screenOptions={{
          headerShown: false,
        }}
      >
      <Stack.Screen
          name="Parent"
          component={BottomTab}
          options={{ headerShown: false, gestureEnabled: false }}
        />
    </Stack.Navigator>
  )
}

export default AppNavigator