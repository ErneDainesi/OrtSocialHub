import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './screens/Register';
import Home from './screens/Home';
import Error from './screens/Error';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Error" component={Error} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
