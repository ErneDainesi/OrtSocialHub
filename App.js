import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './screens/Register';
import Home from './screens/Home';
import Error from './screens/Error';
import Login from './screens/Login';
import { AuthProvider } from './context/AuthContext';
import { FeedProvider } from './context/FeedContext'

const Stack = createStackNavigator();

export default function App() {
    return (
        <AuthProvider>
            <FeedProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Register" component={Register} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Error" component={Error} />
                    </Stack.Navigator>
                </NavigationContainer>
            </FeedProvider>
        </AuthProvider>
    );
}
