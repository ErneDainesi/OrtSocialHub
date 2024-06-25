import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import NewsFeed from '../screens/NewsFeed';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

export const BottomNavBar = ({loggedInUserId}) => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Login') {
                        iconName = focused ? 'log-in' : 'log-in-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'grey',
                inactiveTintColor: 'grey',
                labelStyle: { paddingBottom: 10, fontSize: 15 },
                style: { padding: 10, height: 70 },
            }}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="NewsFeed" component={NewsFeed} />  
            <Tab.Screen name="Profile" component={Profile} initialParams={{userId: loggedInUserId}}/>
        </Tab.Navigator>
    );
};

export const NotLoggedInBar = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Login') {
                        iconName = focused ? 'log-in' : 'log-in-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'grey',
                inactiveTintColor: 'grey',
                labelStyle: { paddingBottom: 10, fontSize: 15 },
                style: { padding: 10, height: 70 },
            }}
        >
            <Tab.Screen name="Login" component={Login} options={{tabBarShowLabel: false}} />
            <Tab.Screen name="Register" component={Register} options={{tabBarShowLabel: false}} />
        </Tab.Navigator>
    );
}
