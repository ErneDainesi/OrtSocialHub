import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './screens/Register';
import Home from './screens/Home';
import Error from './screens/Error';
import Login from './screens/Login';
import { AuthProvider } from './context/AuthContext';
import { FeedProvider } from './context/FeedContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavBar from './components/BottomNavBar';
import BottomBar from './components/BottomNavBar';

const Stack = createStackNavigator();

const AppNavigator = () => {
    // TODO: change this when we have a login correctly implemented
    const currentUserId = AsyncStorage.getItem('currentUserId');
    return (
        <Stack.Navigator
            //initialRouteName = {currentUserId ? "Home" : "Register"}
            initialRouteName="Home"
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Error" component={Error} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <FeedProvider>
                <NavigationContainer>
                    <BottomNavBar />
                </NavigationContainer>
            </FeedProvider>
        </AuthProvider>
    );
}
