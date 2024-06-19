import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Login from '../screens/Login';

const Tab = createBottomTabNavigator();

const BottomNavBar = () => {
  return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Login" component={Login} />
        </Tab.Navigator>
  );
}

export default BottomNavBar;
