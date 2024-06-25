import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './screens/Register';
import Home from './screens/Home';
import Error from './screens/Error';
import Login from './screens/Login';
import Profile from './screens/Profile';
import { useContext } from 'react';
import NewsFeed from './screens/NewsFeed';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { FeedProvider } from './context/FeedContext'
import { NewsPostProvider } from './context/NewsPostContext';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
            <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
            <Stack.Screen name="Error" component={Error} />
        </Stack.Navigator>
    );
}

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
            <Stack.Screen name="Error" component={Error} />
            <Stack.Screen name="NewsFeed" component={NewsFeed} />  
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    );
}

const Root = () => {
    const { isLoggedIn } = useContext(AuthContext);
    return (
        <FeedProvider>
            <NewsPostProvider>
                {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
            </NewsPostProvider>
        </FeedProvider>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <AuthProvider>
                <Root />
            </AuthProvider>
        </NavigationContainer>
    );
}
