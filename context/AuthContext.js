import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigation = useNavigation();
    const [profile, setProfile] = useState(null);

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
                body: JSON.stringify(payload),
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                await AsyncStorage.setItem('loggedInUserId', result.loggedInUserId);
                navigation.navigate("Home");
            }
        } catch (error) {
            navigation.navigate("Error");
        }
    }

    const fetchUserProfile = async (userId) => {
        try {
            const response = await fetch(process.env.DEV_URL + `/user/profile/${userId}`, {
                method: 'GET',
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                setProfile(result.user);
            }
        } catch (error) {
            navigation.navigate("Error");
        }
    }

    return (
        <AuthContext.Provider value={{register, login, profile, fetchUserProfile}}> 
            { children }
        </AuthContext.Provider>
    );
}
