import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Error from "./screens/Error";
import Login from "./screens/Login";
import { AuthProvider } from "./context/AuthContext";
import { FeedProvider } from "./context/FeedContext";
import Profile from "./screens/Profile";

const Stack = createStackNavigator();

const AppNavigator = () => {
	return (
		<Stack.Navigator initialRouteName="Profile">
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Register" component={Register} />
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Error" component={Error} />
			<Stack.Screen name="Profile" component={Profile} />
		</Stack.Navigator>
	);
};

export default function App() {
	return (
		<NavigationContainer>
			<AuthProvider>
				<FeedProvider>
					<AppNavigator />
				</FeedProvider>
			</AuthProvider>
		</NavigationContainer>
	);
}
