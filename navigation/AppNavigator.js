import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from './BottomTab';
import Journal from '../screens/Journal';

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
      {/* Journal is exposed via BottomTab now - use tab navigation instead */}
    </Stack.Navigator>
  )
}

export default AppNavigator