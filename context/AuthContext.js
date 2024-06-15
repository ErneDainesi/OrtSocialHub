import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigation = useNavigation();

    const register = async (payload) => {
        try {
            const response = await fetch(process.env.DEV_URL + '/user/register', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (result.success) {
                navigation.navigate("Login");
            } else {
                navigation.navigate("Error");
            }
        } catch (error) {
            navigation.navigate("Error");
        }
    }

    const login = async (payload) => {
        try {
            const response = await fetch(process.env.DEV_URL + '/user/login', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (result.success) {
                await AsyncStorage.setItem('loggedInUserId', result.loggedInUserId);
                await AsyncStorage.setItem('jwt', result.jwt);
                navigation.navigate("Home");
            }
        } catch (error) {
            navigation.navigate("Error");
        }
    }

    return (
        <AuthContext.Provider value={{register, login}}> 
            { children }
        </AuthContext.Provider>
    );
}
