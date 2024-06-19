import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";
import { DEV_URL } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigation = useNavigation();
    const [profile, setProfile] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const userId = await AsyncStorage.getItem('loggedInUserId');
            if (userId) {
                setIsLoggedIn(true);
                setLoggedInUserId(userId);
            }
        };
        checkAuthStatus();
    }, []);

    const register = async (payload) => {
        try {
            const response = await fetch(DEV_URL + '/user/register', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
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
            const response = await fetch(DEV_URL + '/user/login', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(payload),
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                const id = result.loggedInUserId;
                await AsyncStorage.setItem('loggedInUserId', id);
                setIsLoggedIn(true);
                setLoggedInUserId(id);
                navigation.navigate("Home");
            }
        } catch (error) {
            navigation.navigate("Error");
        }
    }


    const fetchUserProfile = async (userId) => {
        try {
            const response = await fetch(DEV_URL + `/user/profile/${userId}`, {
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

    const values = {
        register,
        login,
        profile,
        fetchUserProfile,
        isLoggedIn,
        setIsLoggedIn,
        loggedInUserId,
        setLoggedInUserId
    };

    return (
        <AuthContext.Provider value={values}>
            { children }
        </AuthContext.Provider>
    );
}
