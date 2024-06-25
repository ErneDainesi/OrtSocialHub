import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";
import { DEV_URL } from "../config";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { storage } from "../utils/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigation = useNavigation();
    const [profile, setProfile] = useState(null);
    const [loginError, setLoginError] = useState(null);
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


    const uploadFile = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const filename = v4(); // generate a random name for the file to avoid repetition
        const reference = ref(storage, filename);
        await uploadBytes(reference, blob);
        const url = await getDownloadURL(reference);
        return url;
    }

    const validatePassword = (password) => {
        // Regular expression to check password strength
        const regex = /^(?=.*[A-Z])(?=.*\W).{12,}$/;
        return regex.test(password);
    };

    const register = async (payload, setPasswordError) => {
        try {
            if (!validatePassword(payload.password)) {
                setPasswordError(true);
                return;
            }
            let downloadUrl = "";
            if (payload.profilePicture) {
                downloadUrl = await uploadFile(payload.profilePicture);
            }
            const response = await fetch(DEV_URL + '/user/register', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({...payload, profilePicture: downloadUrl})
            });
            const result = await response.json();
            if (result.success) {
                navigation.navigate("Login");
            } else {
                console.log(result);
                navigation.navigate("Error");
            }
        } catch (error) {
            console.log(error);
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
            } else {
                setLoginError(true);
            }
        } catch (error) {
            setLoginError(true);
        }
    }

    const logout = async () => {
        try{
            const response = await fetch(DEV_URL + '/user/logout',{
                method: "POST",
                headers:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                await AsyncStorage.removeItem('loggedInUserId');
                setIsLoggedIn(false);
                setLoggedInUserId(null);
                navigation.navigate("Login");
            }
        } catch(error) {
            navigation.navigate("Error");
        }
    };


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
        logout,
        profile,
        fetchUserProfile,
        isLoggedIn,
        setIsLoggedIn,
        loggedInUserId,
        setLoggedInUserId,
        loginError
    };

    return (
        <AuthContext.Provider value={values}>
            { children }
        </AuthContext.Provider>
    );
}
