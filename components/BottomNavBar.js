import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import NewsFeed from '../screens/NewsFeed';
import Profile from '../screens/Profile';
import Following from '../screens/Following';

const Tab = createBottomTabNavigator();

export const BottomNavBar = ({loggedInUserId}) => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'NewsFeed') {
                        iconName = focused ? 'document' : 'document-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Logout') {
                        iconName = focused ? 'log-out' : 'log-out-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                "tabBarActiveTintColor": "grey",
                "tabBarInactiveTintColor": "grey",
                "tabBarLabelStyle": {
                    "paddingBottom": 10,
                    "fontSize": 15
                },
                "tabBarStyle": [
                    {
                        "display": "flex"
                    },
                    null
                ]
            })}
        >
            <Tab.Screen name="Home" component={Home} options={{tabBarShowLabel: false}} />
            <Tab.Screen name="NewsFeed" component={NewsFeed} options={{tabBarShowLabel: false}} />  
            <Tab.Screen name="Profile" component={Profile}
                initialParams={{userId: loggedInUserId}}
                options={{tabBarShowLabel: false}} 
                listeners={({navigation}) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.navigate('Profile', { userId: loggedInUserId });
                    }
                })}
            />
            <Tab.Screen name="Following" component={Following} options={{tabBarButton: () => null, tabBarShowLabel: false}} />
            <Tab.Screen name="Login" component={Login} options={{tabBarButton: () => null, tabBarShowLabel: false}} />
            <Tab.Screen name="Register" component={Login} options={{tabBarButton: () => null, tabBarShowLabel: false}} />
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
                    } else if (route.name === 'Register') {
                        iconName = focused ? 'create' : 'create-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                "tabBarActiveTintColor": "grey",
                "tabBarInactiveTintColor": "grey",
                "tabBarLabelStyle": {
                    "paddingBottom": 10,
                    "fontSize": 15
                },
                "tabBarStyle": [
                    {
                        "display": "flex"
                    },
                    null
                ]
            })}
        >
            <Tab.Screen name="Login" component={Login} options={{tabBarShowLabel: false}} />
            <Tab.Screen name="Register" component={Register} options={{tabBarShowLabel: false}} />
            <Tab.Screen name="Home" component={Home} options={{tabBarButton: () => null, tabBarShowLabel: false}} />
        </Tab.Navigator>
    );
}
