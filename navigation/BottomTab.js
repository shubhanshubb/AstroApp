import * as React from 'react';
import { createNativeBottomTabNavigator } from '@bottom-tabs/react-navigation';
import Home from '../screens/Home';
import Journal from '../screens/Journal';
import SavedJournal from '../screens/SavedJournal';

const Tab = createNativeBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#2655A3',
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
          tabBarIcon: () => ({
            sfSymbol: 'signpost.and.arrowtriangle.up.circle',
          }),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedJournal}
        options={{
          tabBarIcon: () => ({ sfSymbol: 'pencil.tip' }),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
