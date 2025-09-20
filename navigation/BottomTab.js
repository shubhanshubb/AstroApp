import * as React from 'react';
import { createNativeBottomTabNavigator } from '@bottom-tabs/react-navigation';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Setting from '../screens/Setting';

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
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: () => ({ sfSymbol: 'person.crop.circle' }),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Setting}
          options={{
            tabBarIcon: () => ({ sfSymbol: 'gear' }),
          }}
        />
      </Tab.Navigator>
  );
};

export default BottomTab;
