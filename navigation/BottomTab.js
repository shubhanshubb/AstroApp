import * as React from 'react';
import { createNativeBottomTabNavigator } from '@bottom-tabs/react-navigation';
import Home from '../screens/Home';
import Journal from '../screens/Journal';

const Tab = createNativeBottomTabNavigator();

const BottomTab = () => {
  return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#FFA500',
          tabBarInactiveTintColor: '#b15d25ff',
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: () => ({ sfSymbol: 'house.fill' }),
          }}
        />
        <Tab.Screen
          name="Journal"
          component={Journal}
          options={{
            tabBarIcon: () => ({ sfSymbol: 'book.fill' }),
          }}
        />
      </Tab.Navigator>
  );
};

export default BottomTab;
